CREATE TABLE article (
  id integer,
  published_date date DEFAULT NULL,
  title varchar(500) DEFAULT '',
  description varchar(1000) DEFAULT '',
  keywords varchar(1000) DEFAULT '',
  image text,
  content text,
  author varchar(200) DEFAULT '',
  is_published integer DEFAULT 0,
  slug varchar(200) DEFAULT '',
  user_id integer DEFAULT 0,
  date_created datetime default null,
  date_modified datetime default null,
  primary key (id)
);  

CREATE TABLE article_article_category (
  id integer,
  article_id integer DEFAULT 0,
  article_category_id integer DEFAULT 0,
  date_created datetime default null,
  date_modified datetime default null,
  primary key (id)
);

CREATE TABLE article_category (
  id integer,
  name varchar(200) DEFAULT '',
  is_active integer DEFAULT 1,
  parent_id integer DEFAULT 0,
  is_menu integer DEFAULT 0,
  slug varchar(200) DEFAULT '',
  display_order integer DEFAULT 0,
  date_created datetime default null,
  date_modified datetime default null,
  primary key (id)
);

insert into article_category(id, name, is_active) values(0, 'Root', 0);

CREATE TABLE page (
  id integer,
  name varchar(200) DEFAULT '',
  title varchar(500) DEFAULT '',
  description varchar(1000) DEFAULT '',
  keywords varchar(1000) DEFAULT '',
  image text,
  content text,
  is_published integer DEFAULT 1,
  author varchar(200) DEFAULT '',
  slug varchar(200) DEFAULT '',
  user_id integer DEFAULT 0,
  date_created datetime default null,
  date_modified datetime default null,
  primary key (id)
);

insert into page (id, name, description, title, content, slug, date_created) values (1, 'home', 'Example Home Page', 'Home Page', 'Hello World!', 'home', '2021-01-01 00:00');

create table snippet (
  id integer,
  name  varchar(200) DEFAULT '',
  description varchar(1000) DEFAULT '',
  content text,
  date_created datetime default null,
  date_modified datetime default null,
  primary key (id)
);

create table users (
  id integer,
  first_name varchar (100) default '',
  last_name varchar (100) default '',
  email varchar (400) default '',
  password varchar (500) default '',
  is_active integer default 0,
  reset_token varchar (500) default '',
  date_created datetime default null,
  date_modified datetime default null,
  primary key (id)
);

create table site (
   id integer,
   site_name varchar (200) default '',
   site_url varchar (200) default '',
   description text,
   google text,
   facebook text,
   bing text,
   twitter text,
   custom text,
   smtp_port varchar (20),
   smtp_username varchar (100),
   smtp_password varchar (100),
   smtp_server varchar (200),
   date_created datetime default null,
   date_modified datetime default null,
   primary key (id)
);
