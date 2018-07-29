# yuheiy.hatenablog.com styles

Hatena Blog theme for [yuhei blog](http://yuheiy.hatenablog.com/).

## Development

1.  Install dependencies

    ```bash
    yarn
    ```

1.  Insert the following code in the footer

    ```html
    <link rel="stylesheet" href="http://localhost:3000/main.css">
    <script async src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
    ```

1.  Run the server

    ```bash
    yarn start
    ```

## Deploy

1.  Build CSS

    ```bash
    yarn build
    ```

1.  Copy and paste contents of `main.bundle.css` to Hatena Blog
