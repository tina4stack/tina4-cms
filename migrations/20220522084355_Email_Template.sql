create table email_template (
   id integer not null,
   name varchar(1000),
   description varchar(1000),
   content text,
   date_created datetime default null,
   date_modified datetime default null,
   primary key (id)
)