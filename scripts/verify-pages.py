import argparse
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin
from urllib.request import HTTPRedirectHandler, build_opener


class KeepRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args):
        return None


def request(opener, url):
    try:
        return opener.open(url, timeout=10)
    except HTTPError as response:
        return response


def check_file(opener, url, expected, status=200):
    with request(opener, url) as response:
        if response.status != status:
            raise ValueError(f'{url}: expected HTTP {status}, received {response.status}')
        media = {'.html': 'text/html', '.txt': 'text/plain'}.get(expected.suffix)
        if media and response.headers.get_content_type() != media:
            raise ValueError(f'{url}: expected {media}, received {response.headers.get_content_type()}')
        actual, original = response.read(), expected.read_bytes()
        if expected.suffix in {'.html', '.txt', '.css', '.js', '.svg', '.json'}:
            actual, original = (data.replace(b'\r\n', b'\n') for data in (actual, original))
        if actual != original:
            raise ValueError(f'{url}: content differs from {expected}')
    print(f'{status} {url}')


def check_redirect(opener, url, target):
    with request(opener, url) as response:
        location = urljoin(url, response.headers.get('Location', ''))
        if response.status not in {301, 302, 307, 308} or location != target:
            raise ValueError(f'{url}: expected redirect to {target}, received {response.status} {location}')
    print(f'{url} -> {target}')


def verify(site, origin):
    opener = build_opener(KeepRedirect())
    required = [
        'index.html', '404.html', 'app-ads.txt', 'favicon.svg', 'style.css', 'toc.js',
        'mountaindog/index.html', 'mountaindog/testing.html', 'mountaindog/testing.css',
        'mountaindog/privacy.html', 'mountaindog/privacy-en.html',
        'mountaindog/terms.html', 'mountaindog/terms-en.html', 'mountaindog/icon.png',
        'mountaindog/assets/motion/motion.css', 'mountaindog/assets/motion/motion.js',
        *(f'mountaindog/screenshots/screen-{number}.jpg' for number in range(1, 4)),
    ]
    for path in required:
        check_file(opener, f'{origin}/{path}', site / path)
    check_file(opener, f'{origin}/', site / 'index.html')
    check_file(opener, f'{origin}/mountaindog/', site / 'mountaindog/index.html')
    check_file(opener, f'{origin}/mountaindog/__pages_verification__/missing.html', site / '404.html', 404)
    check_redirect(opener, f'{origin}/mountaindog?ref=pages', f'{origin}/mountaindog/?ref=pages')
    if origin == 'https://indie-dev-fayang.com':
        for source in ('http://indie-dev-fayang.com', 'https://www.indie-dev-fayang.com'):
            path = '/mountaindog/privacy.html'
            check_redirect(opener, source + path, origin + path)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Compare public Pages responses with the release or rollback files.')
    parser.add_argument('site', type=Path)
    parser.add_argument('--origin', default='https://indie-dev-fayang.com')
    args = parser.parse_args()
    try:
        verify(args.site, args.origin.rstrip('/'))
    except (OSError, URLError, ValueError) as error:
        raise SystemExit(str(error)) from error
