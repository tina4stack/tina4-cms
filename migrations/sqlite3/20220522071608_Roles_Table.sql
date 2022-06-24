create table role (
  id integer,
  name varchar(200) DEFAULT '',
  role_info text,
  date_created datetime default null,
  date_modified datetime default null,    
  primary key (id)
);