create table public."user"
(
    id                serial
        primary key,
    authentication_id varchar(36)  not null,
    email             varchar(255) not null
);

create unique index user_email_key
    on public."user" (email);

create table public.role
(
    id      serial
        primary key,
    user_id integer      not null
        references public."user"
            on update cascade on delete restrict,
    name    varchar(20)  not null,
    icon    varchar(255) not null
);

create table public.goal
(
    id          serial
        primary key,
    user_id     integer       not null
        references public."user"
            on update cascade on delete restrict,
    summary     varchar(255)  not null,
    description varchar(1000) not null,
    "end"       timestamp(3)  not null,
    period      period        not null,
    role_id     integer       not null
        references public.role
            on update cascade on delete restrict
);

create table public.tag
(
    id      serial
        primary key,
    user_id integer     not null
        references public."user"
            on update cascade on delete restrict,
    name    varchar(25) not null
);

create table public."_goalTotag"
(
    "A" integer not null
        references public.goal
            on update cascade on delete cascade,
    "B" integer not null
        references public.tag
            on update cascade on delete cascade
);

create unique index "_goalTotag_AB_unique"
    on public."_goalTotag" ("A", "B");

create index "_goalTotag_B_index"
    on public."_goalTotag" ("B");

