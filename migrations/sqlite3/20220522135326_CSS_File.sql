create table css (
  id integer,
  name varchar(200) DEFAULT '',
  content text,
  is_active integer default 1,
  date_created datetime default null,
  date_modified datetime default null,    
  primary key (id)
);