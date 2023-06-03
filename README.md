<h1> Chat System </h1>
<h3>
A simple chat system created with Laravel & React. With this chat system two users can chat together.
</h3>

<h2>Important features</h2>
<ul>
<li>Send and receive contact (friend) requests</li>
<li>Block & unblock users.</li>
<li>Mark & unmark contact requests as spam.</li>
</ul>

<h2>Installation</h2>
<h3 style="color: #ff527a;"><strong>Please note that these instructions assume you have the necessary dependencies and configurations in place, such as a local server like <a href="https://www.apachefriends.org/download.html" target="_blank"><u>XAMPP</u></a> or <a href="https://laragon.org/" target="_blank"><u>Laragon</u></a>, <a href="https://nodejs.org/en" target="_blank"><u>node js</u></a>, <a href="https://getcomposer.org/" target="_blank"><u>composer</u></a> and <a href="https://vitejs.dev/" target="_blank"><u>vite</u></a></strong></h3>
<ol start="1">
<li>Clone repository</li>
<li>Run <code>composer install</code></li>
<li>Run <code>npm install</code></li>
<li>Run <code>cp .env.example .env</code> </li>
<li>Create a database with whatever name you want, then set:
<ul>
<li><code>DB_DATABASE={dbname_you_just_created}</code></li>
</ul></li>
<li>Run <code>php artisan migrate:fresh --seed</code></li>
<li>In <code>.env</code> file set: 
<ul>
<li><code>BROADCAST_DRIVER=pusher</code></li>
<li><code>PUSHER_APP_ID=local</code></li>
<li><code>PUSHER_APP_KEY=local</code></li>
<li><code>PUSHER_APP_SECRET=local</code></li>
<li><code>PUSHER_HOST="127.0.0.1"</code></li>
<li><code>PUSHER_PORT=6001</code></li>
<li><code>PUSHER_SCHEME=http</code></li>
<li><code>PUSHER_APP_CLUSTER=ap4</code></li>
</ul></li>
<li>In separate terminals run:
<ul>
<li><code>php artisan serve</code></li>
<li><code>php artisan websocket:serve</code></li>
<li><code>vite</code></li>
</ul></li>
<li>Visit: <code>127.0.0.1:8000</code></li>
<li>You can see websocket <code>127.0.0.1:8000/laravel-websockets</code></li>
</ol>

<h2>Default login credentials</h2>
<ul>
<li>Username: <strong>admin</strong></li>
<li>Email: <strong>admin@email.com</strong></li>
<li>Password: <strong>password</strong></li>
</ul>