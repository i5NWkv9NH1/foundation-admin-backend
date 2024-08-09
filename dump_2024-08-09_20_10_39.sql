--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE test;
DROP DATABASE treasure_street_db;




--
-- Drop roles
--

DROP ROLE sora;


--
-- Roles
--

CREATE ROLE sora;
ALTER ROLE sora WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:U8O1BwDZK29jQiKRTjsL7g==$bb872UyVfiV8D0XHuOQqQuTm+GmyB57wNhJrbTGuSjY=:iNGMAchr+fn3YUrIQrqQjeBCNbEujdYqqcEryg3YBAc=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: sora
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO sora;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: sora
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: sora
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: sora
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: sora
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO sora;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: sora
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "test" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: test; Type: DATABASE; Schema: -; Owner: sora
--

CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE test OWNER TO sora;

\connect test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "treasure_street_db" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: treasure_street_db; Type: DATABASE; Schema: -; Owner: sora
--

CREATE DATABASE treasure_street_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE treasure_street_db OWNER TO sora;

\connect treasure_street_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: sys_account_gender_enum; Type: TYPE; Schema: public; Owner: sora
--

CREATE TYPE public.sys_account_gender_enum AS ENUM (
    'MALE',
    'FEMALE'
);


ALTER TYPE public.sys_account_gender_enum OWNER TO sora;

--
-- Name: sys_account_state_enum; Type: TYPE; Schema: public; Owner: sora
--

CREATE TYPE public.sys_account_state_enum AS ENUM (
    'DISABLE',
    'ENABLE'
);


ALTER TYPE public.sys_account_state_enum OWNER TO sora;

--
-- Name: sys_menu_type_enum; Type: TYPE; Schema: public; Owner: sora
--

CREATE TYPE public.sys_menu_type_enum AS ENUM (
    'CATALOG',
    'MENU',
    'BUTTON'
);


ALTER TYPE public.sys_menu_type_enum OWNER TO sora;

--
-- Name: sys_organization_status_enum; Type: TYPE; Schema: public; Owner: sora
--

CREATE TYPE public.sys_organization_status_enum AS ENUM (
    'DISABLE',
    'ENABLE'
);


ALTER TYPE public.sys_organization_status_enum OWNER TO sora;

--
-- Name: sys_organization_type_enum; Type: TYPE; Schema: public; Owner: sora
--

CREATE TYPE public.sys_organization_type_enum AS ENUM (
    'GROUP',
    'DEPARTMENT',
    'COMPANY'
);


ALTER TYPE public.sys_organization_type_enum OWNER TO sora;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sys_account; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_account (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    username character varying NOT NULL,
    "avatarUrl" character varying,
    gender public.sys_account_gender_enum NOT NULL,
    state public.sys_account_state_enum DEFAULT 'ENABLE'::public.sys_account_state_enum NOT NULL,
    phone character varying,
    address character varying,
    password character varying NOT NULL,
    email character varying
);


ALTER TABLE public.sys_account OWNER TO sora;

--
-- Name: sys_account_organization; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_account_organization (
    "accountId" uuid NOT NULL,
    "organizationId" uuid NOT NULL
);


ALTER TABLE public.sys_account_organization OWNER TO sora;

--
-- Name: sys_account_role; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_account_role (
    "accountId" uuid NOT NULL,
    "roleId" uuid NOT NULL
);


ALTER TABLE public.sys_account_role OWNER TO sora;

--
-- Name: sys_action; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_action (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    code character varying NOT NULL,
    icon character varying NOT NULL,
    menu_id uuid NOT NULL,
    "menuId" uuid
);


ALTER TABLE public.sys_action OWNER TO sora;

--
-- Name: sys_menu; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_menu (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    router character varying NOT NULL,
    icon character varying NOT NULL,
    path text,
    parent_id uuid,
    component character varying,
    redirect character varying,
    type public.sys_menu_type_enum DEFAULT 'CATALOG'::public.sys_menu_type_enum NOT NULL,
    sort integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.sys_menu OWNER TO sora;

--
-- Name: sys_organization; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_organization (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    code character varying NOT NULL,
    type public.sys_organization_type_enum DEFAULT 'GROUP'::public.sys_organization_type_enum NOT NULL,
    status public.sys_organization_status_enum DEFAULT 'DISABLE'::public.sys_organization_status_enum NOT NULL,
    sort integer DEFAULT 0 NOT NULL,
    icon character varying NOT NULL,
    path text,
    parent_id uuid
);


ALTER TABLE public.sys_organization OWNER TO sora;

--
-- Name: sys_role; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_role (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    code character varying NOT NULL
);


ALTER TABLE public.sys_role OWNER TO sora;

--
-- Name: sys_role_action; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_role_action (
    "roleId" uuid NOT NULL,
    "actionId" uuid NOT NULL
);


ALTER TABLE public.sys_role_action OWNER TO sora;

--
-- Data for Name: sys_account; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_account (id, "createdAt", "updatedAt", name, username, "avatarUrl", gender, state, phone, address, password, email) FROM stdin;
d92c906b-0663-4331-8768-9c6d72924154	2024-08-09 18:59:33.950447	2024-08-09 18:59:33.950447	Alice Johnson	alicejohnson	https://randomuser.me/api/portraits/women/3.jpg	FEMALE	ENABLE	123-456-7890	123 Maple St	password123	alice.johnson@example.com
93bb2f3c-5097-41bb-a00d-4e83f4dd3071	2024-08-09 18:59:33.950447	2024-08-09 18:59:33.950447	Bob Smith	bobsmith	https://randomuser.me/api/portraits/men/1.jpg	MALE	ENABLE	987-654-3210	456 Oak St	password123	bob.smith@example.com
47ff1a8b-f359-43b0-9387-62c740291d8a	2024-08-09 18:59:33.950447	2024-08-09 18:59:33.950447	Carol Davis	caroldavis	https://randomuser.me/api/portraits/women/2.jpg	FEMALE	DISABLE	555-555-5555	789 Pine St	password123	carol.davis@example.com
7fa27c5e-c9a3-487b-be7c-c5dd9d079ef1	2024-08-09 18:59:33.950447	2024-08-09 18:59:33.950447	David Wilson	davidwilson	https://randomuser.me/api/portraits/men/2.jpg	MALE	ENABLE	333-333-3333	101 Birch St	password123	david.wilson@example.com
64b6050d-e654-4047-b5d7-3fa63f2d2a87	2024-08-09 18:59:33.950447	2024-08-09 18:59:33.950447	Emily Brown	emilybrown	https://randomuser.me/api/portraits/women/4.jpg	FEMALE	ENABLE	444-444-4444	202 Cedar St	password123	emily.brown@example.com
c2a77ba7-68a1-4fe0-a5eb-adce973b9ae7	2024-08-09 18:59:33.950447	2024-08-09 18:59:33.950447	Frank Miller	frankmiller	https://randomuser.me/api/portraits/men/3.jpg	MALE	DISABLE	666-666-6666	303 Elm St	password123	frank.miller@example.com
a2b246d4-d648-49ff-b4b5-57b3a8265af0	2024-08-09 18:59:33.950447	2024-08-09 18:59:33.950447	Grace Lee	gracelee	https://randomuser.me/api/portraits/women/5.jpg	FEMALE	ENABLE	777-777-7777	404 Fir St	password123	grace.lee@example.com
903ef5b0-318e-4dda-b09d-70c2c82bb677	2024-08-09 18:59:33.950447	2024-08-09 18:59:33.950447	Henry Harris	henryharris	https://randomuser.me/api/portraits/men/4.jpg	MALE	ENABLE	888-888-8888	505 Spruce St	password123	henry.harris@example.com
d50e36fb-5cf1-4802-8e7a-21be4e2bf43d	2024-08-09 18:59:33.950447	2024-08-09 18:59:33.950447	Ivy Clark	ivyclark	https://randomuser.me/api/portraits/women/6.jpg	FEMALE	DISABLE	999-999-9999	606 Willow St	password123	ivy.clark@example.com
4d6c54eb-1b8f-4d95-9a43-c5c53c682405	2024-08-09 18:59:33.950447	2024-08-09 18:59:33.950447	James Lewis	jameslewis	https://randomuser.me/api/portraits/men/5.jpg	MALE	ENABLE	000-000-0000	707 Maple Ave	password123	james.lewis@example.com
\.


--
-- Data for Name: sys_account_organization; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_account_organization ("accountId", "organizationId") FROM stdin;
\.


--
-- Data for Name: sys_account_role; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_account_role ("accountId", "roleId") FROM stdin;
d92c906b-0663-4331-8768-9c6d72924154	974f970c-9bad-405c-bd83-27f067399b18
93bb2f3c-5097-41bb-a00d-4e83f4dd3071	1ea19ac7-e55a-4fc1-ae6d-d98e7cd1d2f9
47ff1a8b-f359-43b0-9387-62c740291d8a	31fb5c19-dc98-4ed3-96ff-d0ec89528a39
7fa27c5e-c9a3-487b-be7c-c5dd9d079ef1	4dea5b21-f109-46fa-9ab8-f1b865658a9f
64b6050d-e654-4047-b5d7-3fa63f2d2a87	2c012d8f-8acc-4048-b4ca-37585c0ebf3b
c2a77ba7-68a1-4fe0-a5eb-adce973b9ae7	2d636daf-54e1-4d50-8920-00b1f3966213
a2b246d4-d648-49ff-b4b5-57b3a8265af0	3b0dd561-c6b8-47de-aff3-6d5c98fef04b
903ef5b0-318e-4dda-b09d-70c2c82bb677	d08c5a20-93c4-4d95-920b-72276417ec2a
d50e36fb-5cf1-4802-8e7a-21be4e2bf43d	065cce40-4a25-424f-96fd-2d169a4a5e97
4d6c54eb-1b8f-4d95-9a43-c5c53c682405	34d7da90-919f-46ff-9ecb-83ba9a9e5f3d
\.


--
-- Data for Name: sys_action; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_action (id, "createdAt", "updatedAt", name, code, icon, menu_id, "menuId") FROM stdin;
1ed98267-f277-4509-b30e-4042e4e991af	2024-08-09 19:18:08.547575	2024-08-09 19:18:08.547575	Create	CREATE	mdi-plus	63eb6b64-a2eb-488c-843c-22ec2e636197	\N
62c67926-f935-4af1-8f8e-5bb89a8c7a33	2024-08-09 19:18:08.547575	2024-08-09 19:18:08.547575	Read	READ	mdi-eye	63eb6b64-a2eb-488c-843c-22ec2e636197	\N
ef1bdf1c-9ff0-446d-9088-0a8861a88b85	2024-08-09 19:18:08.547575	2024-08-09 19:18:08.547575	Update	UPDATE	mdi-pencil	63eb6b64-a2eb-488c-843c-22ec2e636197	\N
e45ff3c9-5b5f-482f-ad99-2b65d610066c	2024-08-09 19:18:08.547575	2024-08-09 19:18:08.547575	Delete	DELETE	mdi-delete	63eb6b64-a2eb-488c-843c-22ec2e636197	\N
8a62e2e9-c5f3-4641-957a-1c3ec6875e62	2024-08-09 19:18:08.55017	2024-08-09 19:18:08.55017	Create	CREATE	mdi-plus	bc6973da-e73f-4296-b06c-a7d3313c4b2b	\N
432c8bca-aa55-4dbc-af68-decc4d655ce4	2024-08-09 19:18:08.55017	2024-08-09 19:18:08.55017	Read	READ	mdi-eye	bc6973da-e73f-4296-b06c-a7d3313c4b2b	\N
47dd4309-71b4-4f61-bdb0-2b8031bb7d12	2024-08-09 19:18:08.55017	2024-08-09 19:18:08.55017	Update	UPDATE	mdi-pencil	bc6973da-e73f-4296-b06c-a7d3313c4b2b	\N
f0b9d7d2-3215-4329-b9ee-d074cf9fef8f	2024-08-09 19:18:08.55017	2024-08-09 19:18:08.55017	Delete	DELETE	mdi-delete	bc6973da-e73f-4296-b06c-a7d3313c4b2b	\N
9bb31e07-ecc7-47f8-abdd-56eac979e585	2024-08-09 19:18:08.551067	2024-08-09 19:18:08.551067	Create	CREATE	mdi-plus	42cac1cc-69ad-4296-a029-72dd97b76600	\N
0680721b-7498-4796-a397-beaa23d06553	2024-08-09 19:18:08.551067	2024-08-09 19:18:08.551067	Read	READ	mdi-eye	42cac1cc-69ad-4296-a029-72dd97b76600	\N
a8473bea-9ffe-49f9-a3d0-d71f3a039e15	2024-08-09 19:18:08.551067	2024-08-09 19:18:08.551067	Update	UPDATE	mdi-pencil	42cac1cc-69ad-4296-a029-72dd97b76600	\N
bedb617e-2c3a-44ec-b9f2-926cc9cc1489	2024-08-09 19:18:08.551067	2024-08-09 19:18:08.551067	Delete	DELETE	mdi-delete	42cac1cc-69ad-4296-a029-72dd97b76600	\N
bafce5bd-7bce-406c-b833-1d9e9b3d556b	2024-08-09 19:18:08.552019	2024-08-09 19:18:08.552019	Create	CREATE	mdi-plus	6d080076-d0c6-4f6e-8634-03ada11e2e15	\N
0a941edd-3542-4afa-bab7-3916a338d289	2024-08-09 19:18:08.552019	2024-08-09 19:18:08.552019	Read	READ	mdi-eye	6d080076-d0c6-4f6e-8634-03ada11e2e15	\N
bffb33ab-f25e-490b-9da9-eef4c71db5d0	2024-08-09 19:18:08.552019	2024-08-09 19:18:08.552019	Update	UPDATE	mdi-pencil	6d080076-d0c6-4f6e-8634-03ada11e2e15	\N
8b76743a-e5c6-4c1b-9a0b-14187d0f9d52	2024-08-09 19:18:08.552019	2024-08-09 19:18:08.552019	Delete	DELETE	mdi-delete	6d080076-d0c6-4f6e-8634-03ada11e2e15	\N
96ec7cc3-403e-49f3-819e-6de815b87808	2024-08-09 19:18:08.552746	2024-08-09 19:18:08.552746	Create	CREATE	mdi-plus	bda77a4d-de4f-43c4-9010-914c5b5cd91f	\N
56537f9a-4527-4cde-bda9-5d8195d10a62	2024-08-09 19:18:08.552746	2024-08-09 19:18:08.552746	Read	READ	mdi-eye	bda77a4d-de4f-43c4-9010-914c5b5cd91f	\N
dae94ed1-8774-454a-a1ad-cd90b1dbefd8	2024-08-09 19:18:08.552746	2024-08-09 19:18:08.552746	Update	UPDATE	mdi-pencil	bda77a4d-de4f-43c4-9010-914c5b5cd91f	\N
73e6790b-313d-4665-b8d4-e404a9fa7bff	2024-08-09 19:18:08.552746	2024-08-09 19:18:08.552746	Delete	DELETE	mdi-delete	bda77a4d-de4f-43c4-9010-914c5b5cd91f	\N
885ecef2-bf19-422b-95d8-1cef7fd15e5c	2024-08-09 19:18:08.553412	2024-08-09 19:18:08.553412	Create	CREATE	mdi-plus	9a54a827-e3f7-401b-857d-f51272850e91	\N
921c9d27-683f-4b7a-86d5-31f7bddff5c0	2024-08-09 19:18:08.553412	2024-08-09 19:18:08.553412	Read	READ	mdi-eye	9a54a827-e3f7-401b-857d-f51272850e91	\N
7fa05256-2c6f-4fd3-89ae-2ec2c3a40eb1	2024-08-09 19:18:08.553412	2024-08-09 19:18:08.553412	Update	UPDATE	mdi-pencil	9a54a827-e3f7-401b-857d-f51272850e91	\N
20e68000-f6b6-4aaf-bb9a-e2727899f6c6	2024-08-09 19:18:08.553412	2024-08-09 19:18:08.553412	Delete	DELETE	mdi-delete	9a54a827-e3f7-401b-857d-f51272850e91	\N
6dc28e2d-3445-49e8-bd8c-f9b54d5cdf54	2024-08-09 19:18:08.554165	2024-08-09 19:18:08.554165	Create	CREATE	mdi-plus	5418a828-8779-4550-899f-446abc15b984	\N
0050ac92-3ff9-4bfb-8b80-51e59a23bdfe	2024-08-09 19:18:08.554165	2024-08-09 19:18:08.554165	Read	READ	mdi-eye	5418a828-8779-4550-899f-446abc15b984	\N
38850f39-9ff9-4bfc-b017-8a20ef7207c4	2024-08-09 19:18:08.554165	2024-08-09 19:18:08.554165	Update	UPDATE	mdi-pencil	5418a828-8779-4550-899f-446abc15b984	\N
415788ed-1cb7-4156-825c-1b58bc63a29e	2024-08-09 19:18:08.554165	2024-08-09 19:18:08.554165	Delete	DELETE	mdi-delete	5418a828-8779-4550-899f-446abc15b984	\N
58860d4a-7c12-4352-83f8-5eab8b335453	2024-08-09 19:18:08.55524	2024-08-09 19:18:08.55524	Create	CREATE	mdi-plus	4ae7f3e0-da11-488b-8d6d-4ebf138fc2db	\N
3a0bd5c5-0359-40a3-8a2e-3645a1d9152b	2024-08-09 19:18:08.55524	2024-08-09 19:18:08.55524	Read	READ	mdi-eye	4ae7f3e0-da11-488b-8d6d-4ebf138fc2db	\N
11eaaf6d-8349-4cc5-920f-5de87e28ca14	2024-08-09 19:18:08.55524	2024-08-09 19:18:08.55524	Update	UPDATE	mdi-pencil	4ae7f3e0-da11-488b-8d6d-4ebf138fc2db	\N
93eedb5d-5d17-4e42-855b-52797791c9ca	2024-08-09 19:18:08.55524	2024-08-09 19:18:08.55524	Delete	DELETE	mdi-delete	4ae7f3e0-da11-488b-8d6d-4ebf138fc2db	\N
dcb3809f-cf07-4e1e-b92e-abf4209257a5	2024-08-09 19:18:08.55636	2024-08-09 19:18:08.55636	Create	CREATE	mdi-plus	a7b960a4-93db-4909-9f1b-5916bd43d2f4	\N
5c8f73db-4bc4-49ac-997b-364eabe74615	2024-08-09 19:18:08.55636	2024-08-09 19:18:08.55636	Read	READ	mdi-eye	a7b960a4-93db-4909-9f1b-5916bd43d2f4	\N
8c41cb72-7116-4a11-9b1f-6e396fac21eb	2024-08-09 19:18:08.55636	2024-08-09 19:18:08.55636	Update	UPDATE	mdi-pencil	a7b960a4-93db-4909-9f1b-5916bd43d2f4	\N
2db769ed-6e63-4aec-ab41-43ae0502fd17	2024-08-09 19:18:08.55636	2024-08-09 19:18:08.55636	Delete	DELETE	mdi-delete	a7b960a4-93db-4909-9f1b-5916bd43d2f4	\N
1b069c24-fd6e-4859-99fd-6e99aa7f6887	2024-08-09 19:18:08.557235	2024-08-09 19:18:08.557235	Create	CREATE	mdi-plus	5297cf18-0c2a-4f9d-8aaf-78984806b841	\N
d1741b08-9b66-4232-8077-1a27649b52a3	2024-08-09 19:18:08.557235	2024-08-09 19:18:08.557235	Read	READ	mdi-eye	5297cf18-0c2a-4f9d-8aaf-78984806b841	\N
c0a83ee6-7fed-4360-98e0-957b0a72f239	2024-08-09 19:18:08.557235	2024-08-09 19:18:08.557235	Update	UPDATE	mdi-pencil	5297cf18-0c2a-4f9d-8aaf-78984806b841	\N
b19edb1d-80eb-4bc3-8b32-c88f21cdec09	2024-08-09 19:18:08.557235	2024-08-09 19:18:08.557235	Delete	DELETE	mdi-delete	5297cf18-0c2a-4f9d-8aaf-78984806b841	\N
12dbee53-e0a1-4387-946c-c16e06b1da11	2024-08-09 19:18:08.55799	2024-08-09 19:18:08.55799	Create	CREATE	mdi-plus	52ce90eb-c9bf-404b-8327-deb9ad9cd81c	\N
630520cd-2aa3-44c6-8cbd-7f2efffb7b1f	2024-08-09 19:18:08.55799	2024-08-09 19:18:08.55799	Read	READ	mdi-eye	52ce90eb-c9bf-404b-8327-deb9ad9cd81c	\N
73475e1e-219a-476d-96c1-b4c0c241b6d1	2024-08-09 19:18:08.55799	2024-08-09 19:18:08.55799	Update	UPDATE	mdi-pencil	52ce90eb-c9bf-404b-8327-deb9ad9cd81c	\N
0d6d81f3-8584-437c-934f-176499a7055f	2024-08-09 19:18:08.55799	2024-08-09 19:18:08.55799	Delete	DELETE	mdi-delete	52ce90eb-c9bf-404b-8327-deb9ad9cd81c	\N
4e61f14a-6b56-43e4-a47b-b95f6233a01c	2024-08-09 19:18:08.558693	2024-08-09 19:18:08.558693	Create	CREATE	mdi-plus	fff1644f-f9d2-45cd-965e-6e77602752da	\N
abab05bf-d7b9-444c-bff0-5fe2c82ae6d3	2024-08-09 19:18:08.558693	2024-08-09 19:18:08.558693	Read	READ	mdi-eye	fff1644f-f9d2-45cd-965e-6e77602752da	\N
fbe3b549-eaa4-4cd9-9e87-5e4fcae7cc8a	2024-08-09 19:18:08.558693	2024-08-09 19:18:08.558693	Update	UPDATE	mdi-pencil	fff1644f-f9d2-45cd-965e-6e77602752da	\N
3f0cf65d-08a9-46b4-8979-1ccda914b1a5	2024-08-09 19:18:08.558693	2024-08-09 19:18:08.558693	Delete	DELETE	mdi-delete	fff1644f-f9d2-45cd-965e-6e77602752da	\N
230c8791-4de8-44bb-bd4b-2c8751db30bd	2024-08-09 19:18:08.559434	2024-08-09 19:18:08.559434	Create	CREATE	mdi-plus	de2f8e40-00d4-4c84-8a76-50865bb69a30	\N
dde825a4-bd2f-4d86-811e-c8bad855af38	2024-08-09 19:18:08.559434	2024-08-09 19:18:08.559434	Read	READ	mdi-eye	de2f8e40-00d4-4c84-8a76-50865bb69a30	\N
cb40f130-e854-40e5-a2e0-1cd5c6688d42	2024-08-09 19:18:08.559434	2024-08-09 19:18:08.559434	Update	UPDATE	mdi-pencil	de2f8e40-00d4-4c84-8a76-50865bb69a30	\N
ca5727aa-83ec-4f51-bdc1-a97b5e05c5a5	2024-08-09 19:18:08.559434	2024-08-09 19:18:08.559434	Delete	DELETE	mdi-delete	de2f8e40-00d4-4c84-8a76-50865bb69a30	\N
41425576-44c9-43bc-aad4-62b477106124	2024-08-09 19:18:08.560107	2024-08-09 19:18:08.560107	Create	CREATE	mdi-plus	d746cd80-c631-4cfe-821e-0b37978d3a46	\N
aaf72404-2259-436c-a70c-d9032b836a8a	2024-08-09 19:18:08.560107	2024-08-09 19:18:08.560107	Read	READ	mdi-eye	d746cd80-c631-4cfe-821e-0b37978d3a46	\N
8c2c99ba-c949-4d6f-bcad-654744f235ac	2024-08-09 19:18:08.560107	2024-08-09 19:18:08.560107	Update	UPDATE	mdi-pencil	d746cd80-c631-4cfe-821e-0b37978d3a46	\N
011507b0-7d56-49d9-9052-74035a06eeb8	2024-08-09 19:18:08.560107	2024-08-09 19:18:08.560107	Delete	DELETE	mdi-delete	d746cd80-c631-4cfe-821e-0b37978d3a46	\N
c6375fab-1bda-4bf2-b66f-e9ab22ea7776	2024-08-09 19:18:08.560786	2024-08-09 19:18:08.560786	Create	CREATE	mdi-plus	7c90ea2a-4f8f-4046-ad03-e022a63ba871	\N
cac20504-a8c8-4e75-ba94-af9977eb53de	2024-08-09 19:18:08.560786	2024-08-09 19:18:08.560786	Read	READ	mdi-eye	7c90ea2a-4f8f-4046-ad03-e022a63ba871	\N
f385a552-7485-4e4b-a24c-685085af899c	2024-08-09 19:18:08.560786	2024-08-09 19:18:08.560786	Update	UPDATE	mdi-pencil	7c90ea2a-4f8f-4046-ad03-e022a63ba871	\N
e80c5374-7594-4516-a9eb-fab484717daa	2024-08-09 19:18:08.560786	2024-08-09 19:18:08.560786	Delete	DELETE	mdi-delete	7c90ea2a-4f8f-4046-ad03-e022a63ba871	\N
e6ce0e40-231a-41a1-b25b-986edc8f541e	2024-08-09 19:18:08.561539	2024-08-09 19:18:08.561539	Create	CREATE	mdi-plus	fa983e42-4164-49a0-93df-991ce8df8362	\N
dfe73474-778c-4a9a-b4aa-22ac073f59ec	2024-08-09 19:18:08.561539	2024-08-09 19:18:08.561539	Read	READ	mdi-eye	fa983e42-4164-49a0-93df-991ce8df8362	\N
978722ff-da4e-4b50-9667-290c17939edc	2024-08-09 19:18:08.561539	2024-08-09 19:18:08.561539	Update	UPDATE	mdi-pencil	fa983e42-4164-49a0-93df-991ce8df8362	\N
a7ec977b-f4cf-4be1-8a76-7e532fe83a59	2024-08-09 19:18:08.561539	2024-08-09 19:18:08.561539	Delete	DELETE	mdi-delete	fa983e42-4164-49a0-93df-991ce8df8362	\N
6f2e2995-61e3-469c-8dfa-3a05ea8040b7	2024-08-09 19:18:08.56217	2024-08-09 19:18:08.56217	Create	CREATE	mdi-plus	28ff0833-3bbf-4a82-bb59-45db858e399a	\N
c5a0679e-aab5-4d89-9845-4f34226e878d	2024-08-09 19:18:08.56217	2024-08-09 19:18:08.56217	Read	READ	mdi-eye	28ff0833-3bbf-4a82-bb59-45db858e399a	\N
4c5e1906-9360-4ebc-9016-a171c96c9dc3	2024-08-09 19:18:08.56217	2024-08-09 19:18:08.56217	Update	UPDATE	mdi-pencil	28ff0833-3bbf-4a82-bb59-45db858e399a	\N
8e5b8924-ed1b-4553-bb81-1cdc80ec790c	2024-08-09 19:18:08.56217	2024-08-09 19:18:08.56217	Delete	DELETE	mdi-delete	28ff0833-3bbf-4a82-bb59-45db858e399a	\N
\.


--
-- Data for Name: sys_menu; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_menu (id, "createdAt", "updatedAt", name, router, icon, path, parent_id, component, redirect, type, sort) FROM stdin;
63eb6b64-a2eb-488c-843c-22ec2e636197	2024-08-09 19:07:41.486939	2024-08-09 19:07:41.486939	Dashboard	dashboard	mdi-view-dashboard	63eb6b64-a2eb-488c-843c-22ec2e636197	\N	DashboardComponent	\N	CATALOG	0
bc6973da-e73f-4296-b06c-a7d3313c4b2b	2024-08-09 19:07:41.486939	2024-08-09 19:07:41.486939	Users	users	mdi-account-group	bc6973da-e73f-4296-b06c-a7d3313c4b2b	\N	UsersComponent	\N	CATALOG	1
42cac1cc-69ad-4296-a029-72dd97b76600	2024-08-09 19:07:41.486939	2024-08-09 19:07:41.486939	Settings	settings	mdi-cog	42cac1cc-69ad-4296-a029-72dd97b76600	\N	SettingsComponent	\N	CATALOG	2
6d080076-d0c6-4f6e-8634-03ada11e2e15	2024-08-09 19:07:41.486939	2024-08-09 19:07:41.486939	Reports	reports	mdi-chart-bar	6d080076-d0c6-4f6e-8634-03ada11e2e15	\N	ReportsComponent	\N	CATALOG	3
bda77a4d-de4f-43c4-9010-914c5b5cd91f	2024-08-09 19:07:41.486939	2024-08-09 19:07:41.486939	Profile	profile	mdi-account	bda77a4d-de4f-43c4-9010-914c5b5cd91f	\N	ProfileComponent	\N	CATALOG	4
9a54a827-e3f7-401b-857d-f51272850e91	2024-08-09 19:10:45.877315	2024-08-09 19:10:45.877315	User List	user-list	mdi-account-multiple	bc6973da-e73f-4296-b06c-a7d3313c4b2b.9a54a827-e3f7-401b-857d-f51272850e91	bc6973da-e73f-4296-b06c-a7d3313c4b2b	UserListComponent	\N	MENU	0
5418a828-8779-4550-899f-446abc15b984	2024-08-09 19:10:45.877315	2024-08-09 19:10:45.877315	User Details	user-details	mdi-account-circle	bc6973da-e73f-4296-b06c-a7d3313c4b2b.5418a828-8779-4550-899f-446abc15b984	bc6973da-e73f-4296-b06c-a7d3313c4b2b	UserDetailsComponent	\N	MENU	1
4ae7f3e0-da11-488b-8d6d-4ebf138fc2db	2024-08-09 19:10:45.877315	2024-08-09 19:10:45.877315	General Settings	general-settings	mdi-cog-outline	42cac1cc-69ad-4296-a029-72dd97b76600.4ae7f3e0-da11-488b-8d6d-4ebf138fc2db	42cac1cc-69ad-4296-a029-72dd97b76600	GeneralSettingsComponent	\N	MENU	0
a7b960a4-93db-4909-9f1b-5916bd43d2f4	2024-08-09 19:10:45.877315	2024-08-09 19:10:45.877315	Privacy Settings	privacy-settings	mdi-shield-outline	42cac1cc-69ad-4296-a029-72dd97b76600.a7b960a4-93db-4909-9f1b-5916bd43d2f4	42cac1cc-69ad-4296-a029-72dd97b76600	PrivacySettingsComponent	\N	MENU	1
5297cf18-0c2a-4f9d-8aaf-78984806b841	2024-08-09 19:10:45.877315	2024-08-09 19:10:45.877315	Daily Reports	daily-reports	mdi-calendar-today	6d080076-d0c6-4f6e-8634-03ada11e2e15.5297cf18-0c2a-4f9d-8aaf-78984806b841	6d080076-d0c6-4f6e-8634-03ada11e2e15	DailyReportsComponent	\N	MENU	0
52ce90eb-c9bf-404b-8327-deb9ad9cd81c	2024-08-09 19:10:45.877315	2024-08-09 19:10:45.877315	Monthly Reports	monthly-reports	mdi-calendar-month	6d080076-d0c6-4f6e-8634-03ada11e2e15.52ce90eb-c9bf-404b-8327-deb9ad9cd81c	6d080076-d0c6-4f6e-8634-03ada11e2e15	MonthlyReportsComponent	\N	MENU	1
fff1644f-f9d2-45cd-965e-6e77602752da	2024-08-09 19:10:45.877315	2024-08-09 19:10:45.877315	View Profile	view-profile	mdi-account	bda77a4d-de4f-43c4-9010-914c5b5cd91f.fff1644f-f9d2-45cd-965e-6e77602752da	bda77a4d-de4f-43c4-9010-914c5b5cd91f	ViewProfileComponent	\N	MENU	0
de2f8e40-00d4-4c84-8a76-50865bb69a30	2024-08-09 19:10:45.877315	2024-08-09 19:10:45.877315	Edit Profile	edit-profile	mdi-pencil-outline	bda77a4d-de4f-43c4-9010-914c5b5cd91f.de2f8e40-00d4-4c84-8a76-50865bb69a30	bda77a4d-de4f-43c4-9010-914c5b5cd91f	EditProfileComponent	\N	MENU	1
d746cd80-c631-4cfe-821e-0b37978d3a46	2024-08-09 19:12:12.856012	2024-08-09 19:12:12.856012	User Management	user-management	mdi-account-settings	bc6973da-e73f-4296-b06c-a7d3313c4b2b.d746cd80-c631-4cfe-821e-0b37978d3a46	bc6973da-e73f-4296-b06c-a7d3313c4b2b	UserManagementComponent	\N	MENU	2
7c90ea2a-4f8f-4046-ad03-e022a63ba871	2024-08-09 19:12:12.856012	2024-08-09 19:12:12.856012	User Permissions	user-permissions	mdi-account-key	bc6973da-e73f-4296-b06c-a7d3313c4b2b.7c90ea2a-4f8f-4046-ad03-e022a63ba871	bc6973da-e73f-4296-b06c-a7d3313c4b2b	UserPermissionsComponent	\N	MENU	3
fa983e42-4164-49a0-93df-991ce8df8362	2024-08-09 19:12:12.856012	2024-08-09 19:12:12.856012	System Overview	system-overview	mdi-eye	6d080076-d0c6-4f6e-8634-03ada11e2e15.fa983e42-4164-49a0-93df-991ce8df8362	6d080076-d0c6-4f6e-8634-03ada11e2e15	SystemOverviewComponent	\N	MENU	1
28ff0833-3bbf-4a82-bb59-45db858e399a	2024-08-09 19:12:12.856012	2024-08-09 19:12:12.856012	User Activity	user-activity	mdi-history	6d080076-d0c6-4f6e-8634-03ada11e2e15.28ff0833-3bbf-4a82-bb59-45db858e399a	6d080076-d0c6-4f6e-8634-03ada11e2e15	UserActivityComponent	\N	MENU	2
\.


--
-- Data for Name: sys_organization; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_organization (id, "createdAt", "updatedAt", name, code, type, status, sort, icon, path, parent_id) FROM stdin;
0ba5d1ce-7db2-4c32-ae44-3bebb619b461	2024-08-09 19:36:00.607964	2024-08-09 19:36:00.607964	Engineering Department	eng-dept	GROUP	DISABLE	0	mdi-tools	df01a6d3-1934-433a-a044-a8a2741add14.0ba5d1ce-7db2-4c32-ae44-3bebb619b461	df01a6d3-1934-433a-a044-a8a2741add14
1e5a4ab6-4f51-479d-9298-dbded60f7090	2024-08-09 19:36:00.607964	2024-08-09 19:36:00.607964	Marketing Department	mkt-dept	GROUP	DISABLE	1	mdi-bullhorn	df01a6d3-1934-433a-a044-a8a2741add14.1e5a4ab6-4f51-479d-9298-dbded60f7090	df01a6d3-1934-433a-a044-a8a2741add14
4830b375-c2ad-43a4-bbbc-2da4ffb719b9	2024-08-09 19:36:00.607964	2024-08-09 19:36:00.607964	Sales Department	sales-dept	GROUP	DISABLE	2	mdi-cart	df01a6d3-1934-433a-a044-a8a2741add14.4830b375-c2ad-43a4-bbbc-2da4ffb719b9	df01a6d3-1934-433a-a044-a8a2741add14
c1db8559-5a8c-4927-8737-b7f95961e8b1	2024-08-09 19:36:00.607964	2024-08-09 19:36:00.607964	HR Department	hr-dept	GROUP	DISABLE	3	mdi-account-group	df01a6d3-1934-433a-a044-a8a2741add14.c1db8559-5a8c-4927-8737-b7f95961e8b1	df01a6d3-1934-433a-a044-a8a2741add14
898ac242-5884-4751-b9b4-355a2bdbeec7	2024-08-09 19:36:00.607964	2024-08-09 19:36:00.607964	Finance Department	finance-dept	GROUP	DISABLE	4	mdi-cash	df01a6d3-1934-433a-a044-a8a2741add14.898ac242-5884-4751-b9b4-355a2bdbeec7	df01a6d3-1934-433a-a044-a8a2741add14
44679080-ff1c-47f0-8d4e-28a6e9a59cd5	2024-08-09 19:36:00.607964	2024-08-09 19:36:00.607964	IT Support	it-support	GROUP	DISABLE	5	mdi-laptop	df01a6d3-1934-433a-a044-a8a2741add14.44679080-ff1c-47f0-8d4e-28a6e9a59cd5	df01a6d3-1934-433a-a044-a8a2741add14
a21f2765-11ab-4d19-89c7-b89027bd1647	2024-08-09 19:36:00.607964	2024-08-09 19:36:00.607964	Customer Service	cust-service	GROUP	DISABLE	6	mdi-headset	df01a6d3-1934-433a-a044-a8a2741add14.a21f2765-11ab-4d19-89c7-b89027bd1647	df01a6d3-1934-433a-a044-a8a2741add14
df01a6d3-1934-433a-a044-a8a2741add14	2024-08-09 19:33:07.223428	2024-08-09 19:33:07.223428	Head Office	HEAD_OFFICE	COMPANY	ENABLE	0	mdi-home	df01a6d3-1934-433a-a044-a8a2741add14	\N
503c052f-2d43-4e89-9d02-7ecc73dccecd	2024-08-09 19:36:00.607964	2024-08-09 19:36:00.607964	Product Development	prod-dev	GROUP	DISABLE	7	mdi-rocket	df01a6d3-1934-433a-a044-a8a2741add14.503c052f-2d43-4e89-9d02-7ecc73dccecd	df01a6d3-1934-433a-a044-a8a2741add14
faaeb768-b69e-4ec0-a832-ce4e50c2b097	2024-08-09 19:36:00.607964	2024-08-09 19:36:00.607964	Legal Department	legal-dept	GROUP	DISABLE	8	mdi-gavel	df01a6d3-1934-433a-a044-a8a2741add14.faaeb768-b69e-4ec0-a832-ce4e50c2b097	df01a6d3-1934-433a-a044-a8a2741add14
1aae86f7-aad1-4f56-9826-b31c8e67a091	2024-08-09 19:36:00.607964	2024-08-09 19:36:00.607964	Logistics	logistics	GROUP	DISABLE	9	mdi-truck	df01a6d3-1934-433a-a044-a8a2741add14.1aae86f7-aad1-4f56-9826-b31c8e67a091	df01a6d3-1934-433a-a044-a8a2741add14
cd55a244-38f4-4425-9246-8f1f8f201868	2024-08-09 19:42:23.886147	2024-08-09 19:42:23.886147	Software Engineering	software-eng	DEPARTMENT	DISABLE	0	mdi-laptop	df01a6d3-1934-433a-a044-a8a2741add14.0ba5d1ce-7db2-4c32-ae44-3bebb619b461.software-eng	0ba5d1ce-7db2-4c32-ae44-3bebb619b461
e8fd2801-6e5f-494e-b6ef-fcde83302748	2024-08-09 19:42:23.887977	2024-08-09 19:42:23.887977	Digital Marketing	digital-mkt	DEPARTMENT	DISABLE	0	mdi-bullhorn	df01a6d3-1934-433a-a044-a8a2741add14.e8fd2801-6e5f-494e-b6ef-fcde83302748.e8fd2801-6e5f-494e-b6ef-fcde83302748	1e5a4ab6-4f51-479d-9298-dbded60f7090
f219e7a0-26c2-4c16-a54b-cf95d0affd1c	2024-08-09 19:42:23.895886	2024-08-09 19:42:23.895886	Supply Chain Management	supply-chain	DEPARTMENT	DISABLE	0	mdi-truck	df01a6d3-1934-433a-a044-a8a2741add14.f219e7a0-26c2-4c16-a54b-cf95d0affd1c.f219e7a0-26c2-4c16-a54b-cf95d0affd1c	1aae86f7-aad1-4f56-9826-b31c8e67a091
220ff267-0fca-448d-b837-bcaaa44e5b4c	2024-08-09 19:42:23.895886	2024-08-09 19:42:23.895886	Warehouse Management	warehouse-mgmt	DEPARTMENT	DISABLE	1	mdi-truck	df01a6d3-1934-433a-a044-a8a2741add14.1aae86f7-aad1-4f56-9826-b31c8e67a091.220ff267-0fca-448d-b837-bcaaa44e5b4c	1aae86f7-aad1-4f56-9826-b31c8e67a091
7beb8464-4b93-4656-9c80-b033232a22b6	2024-08-09 19:42:23.887977	2024-08-09 19:42:23.887977	Content Marketing	content-mkt	DEPARTMENT	DISABLE	1	mdi-bullhorn	df01a6d3-1934-433a-a044-a8a2741add14.7beb8464-4b93-4656-9c80-b033232a22b6.7beb8464-4b93-4656-9c80-b033232a22b6	1e5a4ab6-4f51-479d-9298-dbded60f7090
2db31b41-f2b5-481d-9a09-bd902df96108	2024-08-09 19:42:23.889164	2024-08-09 19:42:23.889164	Domestic Sales	domestic-sales	DEPARTMENT	DISABLE	0	mdi-cart	df01a6d3-1934-433a-a044-a8a2741add14.2db31b41-f2b5-481d-9a09-bd902df96108.2db31b41-f2b5-481d-9a09-bd902df96108	4830b375-c2ad-43a4-bbbc-2da4ffb719b9
eab0c91a-c03e-4f9b-ad7e-64985073c1a9	2024-08-09 19:42:23.890814	2024-08-09 19:42:23.890814	Employee Relations	emp-relations	DEPARTMENT	DISABLE	1	mdi-account-group	df01a6d3-1934-433a-a044-a8a2741add14.eab0c91a-c03e-4f9b-ad7e-64985073c1a9.eab0c91a-c03e-4f9b-ad7e-64985073c1a9	c1db8559-5a8c-4927-8737-b7f95961e8b1
52ae4eb3-212d-4cd3-a341-67ed7e141a49	2024-08-09 19:42:23.886147	2024-08-09 19:42:23.886147	Hardware Engineering	hardware-eng	DEPARTMENT	DISABLE	1	mdi-laptop	df01a6d3-1934-433a-a044-a8a2741add14.52ae4eb3-212d-4cd3-a341-67ed7e141a49.52ae4eb3-212d-4cd3-a341-67ed7e141a49	0ba5d1ce-7db2-4c32-ae44-3bebb619b461
4517ee44-4a60-4c6a-9872-f1436c9f7a65	2024-08-09 19:42:23.889164	2024-08-09 19:42:23.889164	International Sales	international-sales	DEPARTMENT	DISABLE	1	mdi-cart	df01a6d3-1934-433a-a044-a8a2741add14.4517ee44-4a60-4c6a-9872-f1436c9f7a65.4517ee44-4a60-4c6a-9872-f1436c9f7a65	4830b375-c2ad-43a4-bbbc-2da4ffb719b9
e088aa44-9a4d-4b8f-aa8c-938c621fee77	2024-08-09 19:42:23.891958	2024-08-09 19:42:23.891958	Accounting	accounting	DEPARTMENT	DISABLE	0	mdi-cash	df01a6d3-1934-433a-a044-a8a2741add14.e088aa44-9a4d-4b8f-aa8c-938c621fee77.e088aa44-9a4d-4b8f-aa8c-938c621fee77	898ac242-5884-4751-b9b4-355a2bdbeec7
0254b70f-dd39-4803-9c42-68b3f1c7b77f	2024-08-09 19:42:23.891958	2024-08-09 19:42:23.891958	Financial Planning	fin-planning	DEPARTMENT	DISABLE	1	mdi-cash	df01a6d3-1934-433a-a044-a8a2741add14.0254b70f-dd39-4803-9c42-68b3f1c7b77f.0254b70f-dd39-4803-9c42-68b3f1c7b77f	898ac242-5884-4751-b9b4-355a2bdbeec7
9122e24d-9252-4738-af0a-bc52327f9487	2024-08-09 19:42:23.892659	2024-08-09 19:42:23.892659	Technical Support	tech-support	DEPARTMENT	DISABLE	0	mdi-laptop	df01a6d3-1934-433a-a044-a8a2741add14.9122e24d-9252-4738-af0a-bc52327f9487.9122e24d-9252-4738-af0a-bc52327f9487	44679080-ff1c-47f0-8d4e-28a6e9a59cd5
c35fac01-1d8d-4862-8928-8f76d2a2d174	2024-08-09 19:42:23.892659	2024-08-09 19:42:23.892659	Network Support	network-support	DEPARTMENT	DISABLE	1	mdi-laptop	df01a6d3-1934-433a-a044-a8a2741add14.c35fac01-1d8d-4862-8928-8f76d2a2d174.c35fac01-1d8d-4862-8928-8f76d2a2d174	44679080-ff1c-47f0-8d4e-28a6e9a59cd5
dc5a5e59-a9d4-4c81-9c6a-a2cc5178ccb8	2024-08-09 19:42:23.890814	2024-08-09 19:42:23.890814	Recruitment	recruitment	DEPARTMENT	DISABLE	0	mdi-account-group	df01a6d3-1934-433a-a044-a8a2741add14.dc5a5e59-a9d4-4c81-9c6a-a2cc5178ccb8.dc5a5e59-a9d4-4c81-9c6a-a2cc5178ccb8	c1db8559-5a8c-4927-8737-b7f95961e8b1
555d9b61-e591-438f-aab7-9a92e7c77d33	2024-08-09 19:42:23.894189	2024-08-09 19:42:23.894189	Product Design	product-design	DEPARTMENT	DISABLE	0	mdi-rocket	df01a6d3-1934-433a-a044-a8a2741add14.555d9b61-e591-438f-aab7-9a92e7c77d33.555d9b61-e591-438f-aab7-9a92e7c77d33	503c052f-2d43-4e89-9d02-7ecc73dccecd
45bf9032-2e45-4634-87cd-068eac9c4ca6	2024-08-09 19:42:23.894189	2024-08-09 19:42:23.894189	Product Testing	product-testing	DEPARTMENT	DISABLE	1	mdi-rocket	df01a6d3-1934-433a-a044-a8a2741add14.45bf9032-2e45-4634-87cd-068eac9c4ca6.45bf9032-2e45-4634-87cd-068eac9c4ca6	503c052f-2d43-4e89-9d02-7ecc73dccecd
332428da-2104-4ace-9ad0-a14694f9434d	2024-08-09 19:42:23.895147	2024-08-09 19:42:23.895147	Corporate Law	corp-law	DEPARTMENT	DISABLE	0	mdi-gavel	df01a6d3-1934-433a-a044-a8a2741add14.332428da-2104-4ace-9ad0-a14694f9434d.332428da-2104-4ace-9ad0-a14694f9434d	faaeb768-b69e-4ec0-a832-ce4e50c2b097
fbdc170d-5a5a-4ec5-a232-fa04ffb5e232	2024-08-09 19:42:23.895147	2024-08-09 19:42:23.895147	Compliance	compliance	DEPARTMENT	DISABLE	1	mdi-gavel	df01a6d3-1934-433a-a044-a8a2741add14.fbdc170d-5a5a-4ec5-a232-fa04ffb5e232.fbdc170d-5a5a-4ec5-a232-fa04ffb5e232	faaeb768-b69e-4ec0-a832-ce4e50c2b097
\.


--
-- Data for Name: sys_role; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_role (id, "createdAt", "updatedAt", name, code) FROM stdin;
974f970c-9bad-405c-bd83-27f067399b18	2024-08-09 18:59:44.852785	2024-08-09 18:59:44.852785	Admin	ADMIN
1ea19ac7-e55a-4fc1-ae6d-d98e7cd1d2f9	2024-08-09 18:59:44.852785	2024-08-09 18:59:44.852785	User	USER
065cce40-4a25-424f-96fd-2d169a4a5e97	2024-08-09 18:59:44.852785	2024-08-09 18:59:44.852785	Moderator	MODERATOR
4dea5b21-f109-46fa-9ab8-f1b865658a9f	2024-08-09 18:59:44.852785	2024-08-09 18:59:44.852785	Manager	MANAGER
2c012d8f-8acc-4048-b4ca-37585c0ebf3b	2024-08-09 18:59:44.852785	2024-08-09 18:59:44.852785	Developer	DEVELOPER
31fb5c19-dc98-4ed3-96ff-d0ec89528a39	2024-08-09 18:59:44.852785	2024-08-09 18:59:44.852785	HR	HR
3b0dd561-c6b8-47de-aff3-6d5c98fef04b	2024-08-09 18:59:44.852785	2024-08-09 18:59:44.852785	Finance	FINANCE
d08c5a20-93c4-4d95-920b-72276417ec2a	2024-08-09 18:59:44.852785	2024-08-09 18:59:44.852785	Support	SUPPORT
2d636daf-54e1-4d50-8920-00b1f3966213	2024-08-09 18:59:44.852785	2024-08-09 18:59:44.852785	Sales	SALES
34d7da90-919f-46ff-9ecb-83ba9a9e5f3d	2024-08-09 18:59:44.852785	2024-08-09 18:59:44.852785	Guest	GUEST
\.


--
-- Data for Name: sys_role_action; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_role_action ("roleId", "actionId") FROM stdin;
974f970c-9bad-405c-bd83-27f067399b18	1ed98267-f277-4509-b30e-4042e4e991af
974f970c-9bad-405c-bd83-27f067399b18	62c67926-f935-4af1-8f8e-5bb89a8c7a33
974f970c-9bad-405c-bd83-27f067399b18	ef1bdf1c-9ff0-446d-9088-0a8861a88b85
974f970c-9bad-405c-bd83-27f067399b18	e45ff3c9-5b5f-482f-ad99-2b65d610066c
1ea19ac7-e55a-4fc1-ae6d-d98e7cd1d2f9	62c67926-f935-4af1-8f8e-5bb89a8c7a33
1ea19ac7-e55a-4fc1-ae6d-d98e7cd1d2f9	ef1bdf1c-9ff0-446d-9088-0a8861a88b85
065cce40-4a25-424f-96fd-2d169a4a5e97	1ed98267-f277-4509-b30e-4042e4e991af
065cce40-4a25-424f-96fd-2d169a4a5e97	62c67926-f935-4af1-8f8e-5bb89a8c7a33
065cce40-4a25-424f-96fd-2d169a4a5e97	ef1bdf1c-9ff0-446d-9088-0a8861a88b85
4dea5b21-f109-46fa-9ab8-f1b865658a9f	1ed98267-f277-4509-b30e-4042e4e991af
4dea5b21-f109-46fa-9ab8-f1b865658a9f	62c67926-f935-4af1-8f8e-5bb89a8c7a33
4dea5b21-f109-46fa-9ab8-f1b865658a9f	e45ff3c9-5b5f-482f-ad99-2b65d610066c
2c012d8f-8acc-4048-b4ca-37585c0ebf3b	1ed98267-f277-4509-b30e-4042e4e991af
2c012d8f-8acc-4048-b4ca-37585c0ebf3b	ef1bdf1c-9ff0-446d-9088-0a8861a88b85
31fb5c19-dc98-4ed3-96ff-d0ec89528a39	62c67926-f935-4af1-8f8e-5bb89a8c7a33
31fb5c19-dc98-4ed3-96ff-d0ec89528a39	e45ff3c9-5b5f-482f-ad99-2b65d610066c
3b0dd561-c6b8-47de-aff3-6d5c98fef04b	1ed98267-f277-4509-b30e-4042e4e991af
d08c5a20-93c4-4d95-920b-72276417ec2a	62c67926-f935-4af1-8f8e-5bb89a8c7a33
d08c5a20-93c4-4d95-920b-72276417ec2a	ef1bdf1c-9ff0-446d-9088-0a8861a88b85
2d636daf-54e1-4d50-8920-00b1f3966213	1ed98267-f277-4509-b30e-4042e4e991af
2d636daf-54e1-4d50-8920-00b1f3966213	e45ff3c9-5b5f-482f-ad99-2b65d610066c
34d7da90-919f-46ff-9ecb-83ba9a9e5f3d	62c67926-f935-4af1-8f8e-5bb89a8c7a33
\.


--
-- Name: sys_role PK_12875ba0686cf845f353704dc7b; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_role
    ADD CONSTRAINT "PK_12875ba0686cf845f353704dc7b" PRIMARY KEY (id);


--
-- Name: sys_account_organization PK_38f9f23e8f828db59cdc9ba534c; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_organization
    ADD CONSTRAINT "PK_38f9f23e8f828db59cdc9ba534c" PRIMARY KEY ("accountId", "organizationId");


--
-- Name: sys_action PK_43e1cf65c5bc7aba4950d7d200a; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_action
    ADD CONSTRAINT "PK_43e1cf65c5bc7aba4950d7d200a" PRIMARY KEY (id);


--
-- Name: sys_role_action PK_57aed3a1f033a17242f717e6a79; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_role_action
    ADD CONSTRAINT "PK_57aed3a1f033a17242f717e6a79" PRIMARY KEY ("roleId", "actionId");


--
-- Name: sys_account PK_842d421e858abcfb1723e6b18b7; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account
    ADD CONSTRAINT "PK_842d421e858abcfb1723e6b18b7" PRIMARY KEY (id);


--
-- Name: sys_menu PK_8b22e66a03950819c40639e58f8; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_menu
    ADD CONSTRAINT "PK_8b22e66a03950819c40639e58f8" PRIMARY KEY (id);


--
-- Name: sys_organization PK_9e88b7e4bcec4b41f17bc17ac1a; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_organization
    ADD CONSTRAINT "PK_9e88b7e4bcec4b41f17bc17ac1a" PRIMARY KEY (id);


--
-- Name: sys_account_role PK_ef769ec9ffb54d06360f0141001; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_role
    ADD CONSTRAINT "PK_ef769ec9ffb54d06360f0141001" PRIMARY KEY ("accountId", "roleId");


--
-- Name: sys_account UQ_056ebf4666d45f1ff052ef3c137; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account
    ADD CONSTRAINT "UQ_056ebf4666d45f1ff052ef3c137" UNIQUE (email);


--
-- Name: sys_organization UQ_5cf563c8eddda5af22cd4128d21; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_organization
    ADD CONSTRAINT "UQ_5cf563c8eddda5af22cd4128d21" UNIQUE (code);


--
-- Name: sys_menu UQ_83b806aa0e6194f063a1c86c6a1; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_menu
    ADD CONSTRAINT "UQ_83b806aa0e6194f063a1c86c6a1" UNIQUE (router);


--
-- Name: sys_role UQ_cf51756dc07761fea6b351e0615; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_role
    ADD CONSTRAINT "UQ_cf51756dc07761fea6b351e0615" UNIQUE (code);


--
-- Name: sys_account UQ_da69b984c3b2158d7c9608563db; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account
    ADD CONSTRAINT "UQ_da69b984c3b2158d7c9608563db" UNIQUE (username);


--
-- Name: IDX_056ebf4666d45f1ff052ef3c13; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_056ebf4666d45f1ff052ef3c13" ON public.sys_account USING btree (email);


--
-- Name: IDX_12875ba0686cf845f353704dc7; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_12875ba0686cf845f353704dc7" ON public.sys_role USING btree (id);


--
-- Name: IDX_1665ed5b4e15289d81bfa21b08; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_1665ed5b4e15289d81bfa21b08" ON public.sys_role_action USING btree ("actionId");


--
-- Name: IDX_2a0a8eb2d1a03609bd35affc04; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_2a0a8eb2d1a03609bd35affc04" ON public.sys_account_role USING btree ("accountId");


--
-- Name: IDX_43e1cf65c5bc7aba4950d7d200; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_43e1cf65c5bc7aba4950d7d200" ON public.sys_action USING btree (id);


--
-- Name: IDX_5cf563c8eddda5af22cd4128d2; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_5cf563c8eddda5af22cd4128d2" ON public.sys_organization USING btree (code);


--
-- Name: IDX_7d6b58a3cc1b810137da37cebf; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_7d6b58a3cc1b810137da37cebf" ON public.sys_account_organization USING btree ("organizationId");


--
-- Name: IDX_83b806aa0e6194f063a1c86c6a; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_83b806aa0e6194f063a1c86c6a" ON public.sys_menu USING btree (router);


--
-- Name: IDX_842d421e858abcfb1723e6b18b; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_842d421e858abcfb1723e6b18b" ON public.sys_account USING btree (id);


--
-- Name: IDX_8b22e66a03950819c40639e58f; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_8b22e66a03950819c40639e58f" ON public.sys_menu USING btree (id);


--
-- Name: IDX_9a4cb65c4d619326d76d23910e; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_9a4cb65c4d619326d76d23910e" ON public.sys_role_action USING btree ("roleId");


--
-- Name: IDX_9e88b7e4bcec4b41f17bc17ac1; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_9e88b7e4bcec4b41f17bc17ac1" ON public.sys_organization USING btree (id);


--
-- Name: IDX_b57f3a2848041d08b0bdc729e4; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_b57f3a2848041d08b0bdc729e4" ON public.sys_account_organization USING btree ("accountId");


--
-- Name: IDX_b7a1a94176cb8fe2fba361c203; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_b7a1a94176cb8fe2fba361c203" ON public.sys_account_role USING btree ("roleId");


--
-- Name: IDX_cf51756dc07761fea6b351e061; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_cf51756dc07761fea6b351e061" ON public.sys_role USING btree (code);


--
-- Name: IDX_da69b984c3b2158d7c9608563d; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_da69b984c3b2158d7c9608563d" ON public.sys_account USING btree (username);


--
-- Name: sys_role_action FK_1665ed5b4e15289d81bfa21b08e; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_role_action
    ADD CONSTRAINT "FK_1665ed5b4e15289d81bfa21b08e" FOREIGN KEY ("actionId") REFERENCES public.sys_action(id);


--
-- Name: sys_account_role FK_2a0a8eb2d1a03609bd35affc04c; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_role
    ADD CONSTRAINT "FK_2a0a8eb2d1a03609bd35affc04c" FOREIGN KEY ("accountId") REFERENCES public.sys_account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sys_menu FK_7cef4adcf9b01b2c6f14d52b0f3; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_menu
    ADD CONSTRAINT "FK_7cef4adcf9b01b2c6f14d52b0f3" FOREIGN KEY (parent_id) REFERENCES public.sys_menu(id);


--
-- Name: sys_account_organization FK_7d6b58a3cc1b810137da37cebfa; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_organization
    ADD CONSTRAINT "FK_7d6b58a3cc1b810137da37cebfa" FOREIGN KEY ("organizationId") REFERENCES public.sys_organization(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sys_role_action FK_9a4cb65c4d619326d76d23910ee; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_role_action
    ADD CONSTRAINT "FK_9a4cb65c4d619326d76d23910ee" FOREIGN KEY ("roleId") REFERENCES public.sys_role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sys_action FK_b385308002a42d03d32ed506dde; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_action
    ADD CONSTRAINT "FK_b385308002a42d03d32ed506dde" FOREIGN KEY ("menuId") REFERENCES public.sys_menu(id) ON DELETE CASCADE;


--
-- Name: sys_account_organization FK_b57f3a2848041d08b0bdc729e44; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_organization
    ADD CONSTRAINT "FK_b57f3a2848041d08b0bdc729e44" FOREIGN KEY ("accountId") REFERENCES public.sys_account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sys_account_role FK_b7a1a94176cb8fe2fba361c2033; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_role
    ADD CONSTRAINT "FK_b7a1a94176cb8fe2fba361c2033" FOREIGN KEY ("roleId") REFERENCES public.sys_role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sys_organization FK_f76dc95234989871b19ac37baf0; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_organization
    ADD CONSTRAINT "FK_f76dc95234989871b19ac37baf0" FOREIGN KEY (parent_id) REFERENCES public.sys_organization(id);


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

