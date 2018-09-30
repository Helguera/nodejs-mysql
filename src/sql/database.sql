drop table news;

create table news (
    id_news INT NOT NULL KEY AUTO_INCREMENT,
    title VARCHAR(100),
    news TEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE news;

insert into news(title, news) values ('my title', 'contenido de la noticia');

