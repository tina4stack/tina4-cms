create table layout (
	id integer default 0 not null,
	name varchar(255) default 'default' not null,
	website_id integer default 1 not null references site(id) on update cascade on delete cascade,
	date_created timestamp default 'now' not null,
	date_modified timestamp default null,
	layout_type varchar(20) default 'page' not null,
	page_layout blob sub_type 0,
    page_layout_html blob sub_type 0,
   primary key (id)
)