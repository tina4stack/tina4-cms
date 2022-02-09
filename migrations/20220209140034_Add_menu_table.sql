CREATE TABLE menu (
  id integer,
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