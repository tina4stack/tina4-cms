alter table article add site_id integer default 1 not null references site(id) on update cascade on delete cascade;
alter table article_category add site_id integer default 1 not null references site(id) on update cascade on delete cascade;
alter table css add site_id integer default 1 not null references site(id) on update cascade on delete cascade;
alter table email_template add site_id integer default 1 not null references site(id) on update cascade on delete cascade;
alter table menu add site_id integer default 1 not null references site(id) on update cascade on delete cascade;
alter table "PAGE" add site_id integer default 1 not null references site(id) on update cascade on delete cascade;
alter table users add site_id integer default 1 not null references site(id) on update cascade on delete cascade;