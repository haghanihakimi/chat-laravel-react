<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="white">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title inertia>{{ env('APP_NAME') }}</title>
        <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon">
        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="w-screen h-screen p-0 m-0 bg-milky-white dark:bg-dark">
        @inertia
    </body>
</html>
