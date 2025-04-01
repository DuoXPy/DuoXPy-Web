const getHtml = (key) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DuoXPyMax Key</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        /* Your existing CSS styles here */
    </style>
</head>
<body>
    <div class="container">
        <h1 class="key">${key}</h1>
        <button class="button" id="copyButton">Copy Key</button>
        <div class="social-links">
            <a href="https://discord.gg/KBzNXRZRdz" class="button">Join Discord</a>
            <a href="https://github.com/gorouflex/DuoXPyMax" class="button">GitHub</a>
        </div>
        <div class="footer">
            Made with ❤️ by GorouFlex and NotchApple1703
        </div>
    </div>

    <script type="text/javascript">
        // Your existing JavaScript here
    </script>
</body>
</html>`;

const getLinkHtml = (link) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DuoXPyMax Link</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        /* Your existing CSS styles here */
    </style>
</head>
<body>
    <div class="container">
        <h1 class="key">${link}</h1>
        <a href="${link}" class="button">Go to Link</a>
        <div class="social-links">
            <a href="https://discord.gg/KBzNXRZRdz" class="button">Join Discord</a>
            <a href="https://github.com/gorouflex/DuoXPyMax" class="button">GitHub</a>
        </div>
        <div class="footer">
            Made with ❤️ by GorouFlex and NotchApple1703
        </div>
    </div>

    <script type="text/javascript">
        // Your existing JavaScript here
    </script>
</body>
</html>`;

module.exports = { getHtml, getLinkHtml };
