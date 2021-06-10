create database ORGANISATION;

create table users(
  user_id uuid primary key default uuid_generate_v4(),
  user_name varchar(255) not null,
  user_email varchar(255) not null,
  user_password varchar(255) not null,
  user_designation varchar(255) not null
);

--insert into users(user_name, user_email, user_password)  values ('kirupa','kirupa4801@gmail.com','S.kirupa@123'); 

create table employee (
  emp_id uuid primary key not null,
  phone varchar(255) not null,
  dob date not null,
  address varchar(255) not null,
  nationality varchar(255) not null,
  blood_group  varchar(255) not null,
  emp_type varchar(255) not null,
  foreign key (emp_id) references users(user_id)
);

create table receipt (
  rid serial primary key not null,
  receipt_name varchar(255) not null,
  emp_id uuid not null,
  date date not null,
  spent_on varchar(255) not null,
  spent_charges varchar(255) not null,
  approval varchar(255) default null,
  refund varchar(255) default null,
  foreign key (emp_id) references employee(emp_id)
);


CREATE or replace PROCEDURE insert_details(en in varchar(255),em in varchar(255),pwd in varchar(255),de in varchar(255),pn in varchar(255),dob in varchar(255),ad in varchar(255),ny in varchar(255),bg in varchar(255),et in varchar(255))
LANGUAGE PLPGSQL AS
$$
DECLARE
id_uuid uuid := uuid_generate_v4();
BEGIN
INSERT INTO users 
(user_id,user_name,user_email,user_password,user_designation)
VALUES
(id_uuid,en,em,pwd,de);
INSERT INTO employee 
(emp_id,phone,dob,address,nationality,blood_group,emp_type)
VALUES
(id_uuid,pn,cast(dob as date),ad,ny,bg,et);
END
$$;

CREATE or REPLACE FUNCTION insert_details(en in varchar(255),em in varchar(255),pwd in varchar(255),de in varchar(255),pn in varchar(255),dob in varchar(255),ad in varchar(255),ny in varchar(255),bg in varchar(255),et in varchar(255))
RETURNS uuid as $id_uuid$
DECLARE
id_uuid uuid := uuid_generate_v4();
BEGIN
INSERT INTO users 
(user_id,user_name,user_email,user_password,user_designation)
VALUES
(id_uuid,en,em,pwd,de);
INSERT INTO employee 
(emp_id,phone,dob,address,nationality,blood_group,emp_type)
VALUES
(id_uuid,pn,cast(dob as date),ad,ny,bg,et);
RETURN id_uuid;
END
$id_uuid$ LANGUAGE PLPGSQL;

call insert_into_employee('sin','3287495687','sin@gmail.com','04-08-2001','erode','indian','O+ve','employee');

select * from employee;


create or replace procedure insert_into_receipt(rn in varchar(255),eid in varchar(255),dt in varchar(255),son in varchar(255),sch in varchar(255))
Language sql as
$$
insert into receipt(receipt_name,emp_id,date,spent_on,spent_charges) values (rn,cast(eid as uuid),cast(dt as date),son,sch);
$$;
