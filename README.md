# Node.js PayPal REST SDK

how to use the PayPal REST SDK with Node.js to take a payment

### Installation

Install the dependencies

```sh
$ npm install
```

### Serve

To serve in the browser

```sh
$ npm start
```

### setup

#### configure paypal in `controllers\bookingcontroller.js`

    ```js
    paypal.configure({
        mode: "sandbox", //sandbox or live
        client_id:
        "AeuKv1bLzxxxxx", // your paypal client ID
        client_secret:
        "EO3x8vGxy84bX_xxxxx",  //your paypal client secret
        });

```

