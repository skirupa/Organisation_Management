create database ORGANISATION;

create table users(
  user_id uuid primary key default uuid_generate_v4(),
  user_name varchar(255) not null,
  user_email varchar(255) not null,
  user_password varchar(255) not null,
  user_designation varchar(255) not null
);

--insert into users(user_name, user_email, user_password)  values ('kirupa','kirupa4801@gmail.com','S.kirupa@123'); 
