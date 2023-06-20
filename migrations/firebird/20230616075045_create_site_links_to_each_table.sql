alter table article add site_id integer not null default 1 references site(id) on update cascade on delete cascade;
alter table article_category add site_id integer not null default 1 references site(id) on update cascade on delete cascade;
alter table css add site_id integer not null default 1 references site(id) on update cascade on delete cascade;
alter table email_template add site_id integer not null default 1 references site(id) on update cascade on delete cascade;
alter table menu add site_id integer not null default 1 references site(id) on update cascade on delete cascade;
alter table page add site_id integer not null default 1 references site(id) on update cascade on delete cascade;
alter table users add site_id integer not null default 1 references site(id) on update cascade on delete cascade;