React & Redux Sample Project
===========================

Видео
------

1. [Part 1](https://www.youtube.com/watch?v=Emu0bzUBKxQ)
2. [Part 2](https://www.youtube.com/watch?v=kai_6SEwi8w)
3. [Part 3](https://www.youtube.com/watch?v=_eyHUJIHJkw)
4. [Part 4](https://www.youtube.com/watch?v=Zn4hln5a7jU)
5. [Part 5](https://www.youtube.com/watch?v=oG6Vlx4C6Bw)
6. [Part 6](https://www.youtube.com/watch?v=qBh6JHzgd_s)
7. [Part 7](https://www.youtube.com/watch?v=3OENVyDcEuE)

Пререквизиты
------------
Все зависимости прописаны в `package.json`, так что необходимо установить
`node` и `npm`, после чего выполнить команду:

```bash
npm install
```

Разработка
---------
Для разработки запускается `webpack-dev-server` командой, прописанной
в `package.json`:

```bash
npm start
```

При этом `html` страницы с подключенными скриптами доступны по
адресу [localhost:8080](http://localhost:8080)

Все изменения, сделанные в исходных файлах автоматически обновятся на
странице.

Для запуска API сервера необходима Java версии 1.8, для UNIX
систем файл является исполняемым, для Windows необходимо запускать через

```bash
java -jar kOrder.jar
```

Сборка
------
Сборка выполняется скриптом, прописанным в `package.json`:

```bash
npm run build
```

Который собирает `JS` файлы в `target/bundle.js`, после чего его вместе со
статическими файлами из `src/static` можно копировать в любой другой проект
на PHP или nginx без всяких зависимостей и нод.
