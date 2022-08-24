CREATE TABLE article (
                         id integer auto_increment,
                         published_date date DEFAULT NULL,
                         title varchar(500) DEFAULT '',
                         description varchar(1000) DEFAULT '',
                         keywords varchar(1000) DEFAULT '',
                         image text,
                         content longblob,
                         author varchar(200) DEFAULT '',
                         is_published integer DEFAULT 0,
                         slug varchar(200) DEFAULT '',
                         user_id integer DEFAULT 0,
                         date_created datetime default null,
                         date_modified datetime default null,
                         primary key (id)
);

CREATE TABLE article_article_category (
                                          id integer auto_increment,
                                          article_id integer DEFAULT 0,
                                          article_category_id integer DEFAULT 0,
                                          date_created datetime default null,
                                          date_modified datetime default null,
                                          primary key (id)
);

CREATE TABLE article_category (
                                  id integer auto_increment,
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

insert into article_category( name, is_active) values( 'Root', 0);

CREATE TABLE page (
                      id integer auto_increment,
                      name varchar(200) DEFAULT '',
                      title varchar(500) DEFAULT '',
                      description varchar(1000) DEFAULT '',
                      keywords varchar(1000) DEFAULT '',
                      image text,
                      content longblob,
                      is_published integer DEFAULT 1,
                      author varchar(200) DEFAULT '',
                      slug varchar(200) DEFAULT '',
                      user_id integer DEFAULT 0,
                      date_created datetime default null,
                      date_modified datetime default null,
                      primary key (id)
);

insert into page ( name, description, title, content, slug, date_created) values ('home', 'Example Home Page', 'Home Page', 'Hello World!', 'home', '2021-01-01 00:00');

create table snippet (
                         id integer auto_increment,
                         name  varchar(200) DEFAULT '',
                         description varchar(1000) DEFAULT '',
                         content longblob,
                         date_created datetime default null,
                         date_modified datetime default null,
                         primary key (id)
);

create table users (
                       id integer auto_increment,
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
                      id integer auto_increment,
                      site_name varchar (200) default '',
                      site_url varchar (200) default '',
                      description text,
                      google text,
                      facebook text,
                      bing text,
                      twitter text,
                      custom longblob,
                      smtp_port varchar (20),
                      smtp_username varchar (100),
                      smtp_password varchar (100),
                      smtp_server varchar (200),
                      from_email varchar (255) default '',
                      date_created datetime default null,
                      date_modified datetime default null,
                      primary key (id)
);


CREATE TABLE menu (
                      id integer auto_increment,
                      name varchar(200) DEFAULT '',
                      is_active integer DEFAULT 1,
                      parent_id integer DEFAULT 0,
                      slug varchar(200) DEFAULT '',
                      specific_route varchar(255) default '',
                      display_order integer DEFAULT 0,
                      date_created datetime default null,
                      date_modified datetime default null,
                      primary key (id)
);

insert into menu(name, is_active) values('Root', 0);

create table role (
                      id integer auto_increment,
                      name varchar(200) DEFAULT '',
                      role_info text,
                      date_created datetime default null,
                      date_modified datetime default null,
                      primary key (id)
);

create table email_template (
                                id integer auto_increment,
                                name varchar(1000),
                                description varchar(1000),
                                content longblob,
                                date_created datetime default null,
                                date_modified datetime default null,
                                primary key (id)
);

create table css (
                     id integer auto_increment,
                     name varchar(200) DEFAULT '',
                     content longblob,
                     is_active integer default 1,
                     date_created datetime default null,
                     date_modified datetime default null,
                     primary key (id)
);