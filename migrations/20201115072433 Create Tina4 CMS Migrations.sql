CREATE TABLE article (
  id integer,
  published_date date DEFAULT NULL,
  title varchar(500) DEFAULT '',
  description varchar(1000) DEFAULT '',
  keywords varchar(1000) DEFAULT '',
  image blob,
  content blob,
  author varchar(200) DEFAULT '',
  is_published integer DEFAULT 0,
  slug varchar(200) DEFAULT '',
  user_id integer DEFAULT 0,
  date_created timestamp,
  date_modified timestamp,
  primary key (id)
);  

CREATE TABLE article_article_category (
  id integer,
  article_id integer DEFAULT 0,
  article_category_id integer DEFAULT 0,
  date_created timestamp,
  date_modified timestamp,
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
  date_created timestamp,
  date_modified timestamp,
  primary key (id)
);

insert into article_category(id, name) values(0, 'Root');

CREATE TABLE page (
  id integer,
  name varchar(200) DEFAULT '',
  title varchar(500) DEFAULT '',
  description varchar(1000) DEFAULT '',
  keywords varchar(1000) DEFAULT '',
  image blob,
  content blob,
  is_published integer DEFAULT 1,
  author varchar(200) DEFAULT '',
  slug varchar(200) DEFAULT '',
  user_id integer DEFAULT 0,
  date_created timestamp,
  date_modified timestamp,
  primary key (id)
);  

create table snippet (
  id integer,
  name  varchar(200) DEFAULT '',
  description varchar(1000) DEFAULT '',
  content blob,
  date_created timestamp,
  date_modified timestamp,
  primary key (id)
);

create table users (
  id integer,
  first_name varchar (100) default '',
  last_name varchar (100) default '',
  email varchar (400) default '',
  password varchar (500) default '',
  is_active integer default 0 not null,
  reset_token varchar (500) default '',
  date_created timestamp,
  date_modified timestamp,
  primary key (id)
);

create table site (
   id integer,
   site_name varchar (200) default '',
   site_url varchar (200) default '',
   description blob,
   google blob,
   facebook blob,
   bing blob,
   twitter blob,
   custom blob,
   smtp_port varchar (20),
   smtp_username varchar (100),
   smtp_password varchar (100),
   smtp_server varchar (200),
   date_created timestamp,
   date_modified timestamp,
   primary key (id)
);