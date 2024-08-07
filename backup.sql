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
    'NORMAL',
    'LOCKED'
);


ALTER TYPE public.sys_account_state_enum OWNER TO sora;

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
    avatar_url character varying,
    gender public.sys_account_gender_enum NOT NULL,
    state public.sys_account_state_enum NOT NULL,
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
    organization_id uuid NOT NULL,
    account_id uuid NOT NULL
);


ALTER TABLE public.sys_account_organization OWNER TO sora;

--
-- Name: sys_account_role; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_account_role (
    role_id uuid NOT NULL,
    account_id uuid NOT NULL
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
    menu_id uuid NOT NULL
);


ALTER TABLE public.sys_action OWNER TO sora;

--
-- Name: sys_menu; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_menu (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    label character varying NOT NULL,
    router character varying NOT NULL,
    icon character varying NOT NULL,
    path text,
    parent_id uuid
);


ALTER TABLE public.sys_menu OWNER TO sora;

--
-- Name: sys_organization; Type: TABLE; Schema: public; Owner: sora
--

CREATE TABLE public.sys_organization (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    label character varying NOT NULL,
    type character varying NOT NULL,
    icon character varying NOT NULL,
    path text,
    parent_id uuid,
    code character varying NOT NULL
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
    role_id uuid NOT NULL,
    action_id uuid NOT NULL
);


ALTER TABLE public.sys_role_action OWNER TO sora;

--
-- Data for Name: sys_account; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_account (id, "createdAt", "updatedAt", name, username, avatar_url, gender, state, phone, address, password, email) FROM stdin;
2f6a7985-8728-42f0-aa74-c7f1c8520ad5	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Sora	sora	https://i.pravatar.cc/150?img=0	FEMALE	NORMAL	1234567890	123 Street, City	password123	sora@example.com
2c282e14-a7e5-4842-8735-a9813c912747	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Jannarin	jannarin	https://i.pravatar.cc/150?img=1	FEMALE	NORMAL	0987654321	456 Avenue, City	password123	jannarin@example.com
5553ac7d-6339-479a-8274-203f5e9d9adb	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Admin	admin	https://i.pravatar.cc/150?img=5	MALE	NORMAL	1122334455	789 Road, City	adminpassword	admin@example.com
\.


--
-- Data for Name: sys_account_organization; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_account_organization (organization_id, account_id) FROM stdin;
563e33de-88f1-446c-88f2-2b84bc7355a4	2f6a7985-8728-42f0-aa74-c7f1c8520ad5
21956447-efdf-4699-8586-95357e28f282	2c282e14-a7e5-4842-8735-a9813c912747
3503d0de-4d75-474a-bf15-dfc99dfd8ab2	5553ac7d-6339-479a-8274-203f5e9d9adb
\.


--
-- Data for Name: sys_account_role; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_account_role (role_id, account_id) FROM stdin;
96ade398-4804-4981-a31f-2e3521b7dc2c	2f6a7985-8728-42f0-aa74-c7f1c8520ad5
e86b4632-9679-4f42-9fd5-9516fb53b749	2c282e14-a7e5-4842-8735-a9813c912747
f1f9a9ae-bb68-43e9-8558-4b8b1ec188bf	5553ac7d-6339-479a-8274-203f5e9d9adb
\.


--
-- Data for Name: sys_action; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_action (id, "createdAt", "updatedAt", name, code, icon, menu_id) FROM stdin;
9cb0263d-e4e7-4aa3-b930-5af06b3b2e58	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Edit Roles	edit	mdi-pencil	43743a12-6165-4fb9-9118-57169f685145
9cea09b7-a42f-4c56-ba24-05322da4e10c	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Delete Roles	delete	mdi-delete	43743a12-6165-4fb9-9118-57169f685145
772a8f2b-5d7e-4718-b3e0-762b6ceba6c5	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Delete Account	delete	mdi-delete	74d74b3c-97d9-4446-b3b2-054cd496eaba
4eb9d7b7-943a-4504-b7ba-d608b7bd8002	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	View Roles	view	mdi-eye	43743a12-6165-4fb9-9118-57169f685145
751d5937-61d4-4b15-85d4-5d567bbea25b	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	View Organizations	view	mdi-eye	7e878b18-ff39-4622-8e15-e8b99e0235f8
bce460c0-3410-4a6f-b0ef-f97a2d06252e	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Edit Organizations	edit	mdi-pencil	7e878b18-ff39-4622-8e15-e8b99e0235f8
dc633e2d-e6ce-42a7-817b-a816bc267327	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Delete Organizations	delete	mdi-delete	7e878b18-ff39-4622-8e15-e8b99e0235f8
922bfc1e-1fe8-4d5f-bc94-9db3b78d3568	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Create Account	create	mdi-pencil-plus	74d74b3c-97d9-4446-b3b2-054cd496eaba
9db1b657-d184-48a6-adfa-83abe85685a3	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Create Roles	create	mdi-pencil-plus	43743a12-6165-4fb9-9118-57169f685145
8726a8db-5a75-4911-b46b-498d8273a12d	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Create Organizations	create	mdi-pencil-plus	7e878b18-ff39-4622-8e15-e8b99e0235f8
4bafff8c-fec5-4387-8e47-b0fa3c227dd8	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	View Account	view	mdi-eye	74d74b3c-97d9-4446-b3b2-054cd496eaba
3de494ce-da26-49c9-a63a-f78fdd61eb1b	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Edit Account	edit	mdi-pencil	74d74b3c-97d9-4446-b3b2-054cd496eaba
\.


--
-- Data for Name: sys_menu; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_menu (id, "createdAt", "updatedAt", label, router, icon, path, parent_id) FROM stdin;
71ebac63-97e3-468c-ae3b-7b86c437028f	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	System	system	mdi-view-dashboard	71ebac63-97e3-468c-ae3b-7b86c437028f	\N
43743a12-6165-4fb9-9118-57169f685145	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Roles	roles	mdi-account-cog	71ebac63-97e3-468c-ae3b-7b86c437028f.43743a12-6165-4fb9-9118-57169f685145	71ebac63-97e3-468c-ae3b-7b86c437028f
7e878b18-ff39-4622-8e15-e8b99e0235f8	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Organizations	organizations	mdi-domain	71ebac63-97e3-468c-ae3b-7b86c437028f.7e878b18-ff39-4622-8e15-e8b99e0235f8	71ebac63-97e3-468c-ae3b-7b86c437028f
74d74b3c-97d9-4446-b3b2-054cd496eaba	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Accounts	accounts	mdi-account-group	71ebac63-97e3-468c-ae3b-7b86c437028f.74d74b3c-97d9-4446-b3b2-054cd496eaba	71ebac63-97e3-468c-ae3b-7b86c437028f
\.


--
-- Data for Name: sys_organization; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_organization (id, "createdAt", "updatedAt", label, type, icon, path, parent_id, code) FROM stdin;
3503d0de-4d75-474a-bf15-dfc99dfd8ab2	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Company	group	mdi-office-building	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	\N	company
563e33de-88f1-446c-88f2-2b84bc7355a4	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	IT Department	group	mdi-laptop	3503d0de-4d75-474a-bf15-dfc99dfd8ab2.563e33de-88f1-446c-88f2-2b84bc7355a4	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	it_department
21956447-efdf-4699-8586-95357e28f282	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Marketing Department	group	mdi-bullhorn	3503d0de-4d75-474a-bf15-dfc99dfd8ab2.21956447-efdf-4699-8586-95357e28f282	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	marketing_department
2cae953d-5d02-4b16-be92-a5878fef3845	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Development Department	group	mdi-code-braces	3503d0de-4d75-474a-bf15-dfc99dfd8ab2.2cae953d-5d02-4b16-be92-a5878fef3845	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	development_department
f1d6f20f-db3c-4fc1-978b-2f3769d80376	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Testing Department	group	mdi-bug	3503d0de-4d75-474a-bf15-dfc99dfd8ab2.f1d6f20f-db3c-4fc1-978b-2f3769d80376	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	testing_department
f6ea9d14-9223-451b-9888-2167120d8f3a	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Market Department	group	mdi-chart-bar	3503d0de-4d75-474a-bf15-dfc99dfd8ab2.f6ea9d14-9223-451b-9888-2167120d8f3a	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	market_department
1a9164ee-723d-40cd-9262-0283695d4a75	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	IT Department	group	mdi-laptop	3503d0de-4d75-474a-bf15-dfc99dfd8ab2.1a9164ee-723d-40cd-9262-0283695d4a75	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	it_department_duplicate
a0b3ed9b-9dbd-4825-b7d5-28cd7257f7b0	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Marketing Department	group	mdi-bullhorn	3503d0de-4d75-474a-bf15-dfc99dfd8ab2.a0b3ed9b-9dbd-4825-b7d5-28cd7257f7b0	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	marketing_department_duplicate
bff498a4-060b-460d-a27f-0c2c089c6928	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Development Department	group	mdi-code-braces	3503d0de-4d75-474a-bf15-dfc99dfd8ab2.bff498a4-060b-460d-a27f-0c2c089c6928	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	development_department_duplicate
5283f2d5-7bac-4849-b409-9204d30bff60	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Testing Department	group	mdi-bug	3503d0de-4d75-474a-bf15-dfc99dfd8ab2.5283f2d5-7bac-4849-b409-9204d30bff60	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	testing_department_duplicate
fae25a1e-cd39-493a-95c9-86bbc263f738	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Market Department	group	mdi-chart-bar	3503d0de-4d75-474a-bf15-dfc99dfd8ab2.fae25a1e-cd39-493a-95c9-86bbc263f738	3503d0de-4d75-474a-bf15-dfc99dfd8ab2	market_department_duplicate
\.


--
-- Data for Name: sys_role; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_role (id, "createdAt", "updatedAt", name, code) FROM stdin;
96ade398-4804-4981-a31f-2e3521b7dc2c	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Admin	admin
e86b4632-9679-4f42-9fd5-9516fb53b749	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Operation	operation
f1f9a9ae-bb68-43e9-8558-4b8b1ec188bf	2024-08-07 15:44:33.294756	2024-08-07 15:44:33.294756	Developer	developer
\.


--
-- Data for Name: sys_role_action; Type: TABLE DATA; Schema: public; Owner: sora
--

COPY public.sys_role_action (role_id, action_id) FROM stdin;
96ade398-4804-4981-a31f-2e3521b7dc2c	4bafff8c-fec5-4387-8e47-b0fa3c227dd8
96ade398-4804-4981-a31f-2e3521b7dc2c	922bfc1e-1fe8-4d5f-bc94-9db3b78d3568
96ade398-4804-4981-a31f-2e3521b7dc2c	3de494ce-da26-49c9-a63a-f78fdd61eb1b
96ade398-4804-4981-a31f-2e3521b7dc2c	772a8f2b-5d7e-4718-b3e0-762b6ceba6c5
96ade398-4804-4981-a31f-2e3521b7dc2c	4eb9d7b7-943a-4504-b7ba-d608b7bd8002
96ade398-4804-4981-a31f-2e3521b7dc2c	9db1b657-d184-48a6-adfa-83abe85685a3
96ade398-4804-4981-a31f-2e3521b7dc2c	9cb0263d-e4e7-4aa3-b930-5af06b3b2e58
96ade398-4804-4981-a31f-2e3521b7dc2c	9cea09b7-a42f-4c56-ba24-05322da4e10c
96ade398-4804-4981-a31f-2e3521b7dc2c	751d5937-61d4-4b15-85d4-5d567bbea25b
96ade398-4804-4981-a31f-2e3521b7dc2c	8726a8db-5a75-4911-b46b-498d8273a12d
96ade398-4804-4981-a31f-2e3521b7dc2c	bce460c0-3410-4a6f-b0ef-f97a2d06252e
96ade398-4804-4981-a31f-2e3521b7dc2c	dc633e2d-e6ce-42a7-817b-a816bc267327
e86b4632-9679-4f42-9fd5-9516fb53b749	4bafff8c-fec5-4387-8e47-b0fa3c227dd8
e86b4632-9679-4f42-9fd5-9516fb53b749	3de494ce-da26-49c9-a63a-f78fdd61eb1b
e86b4632-9679-4f42-9fd5-9516fb53b749	4eb9d7b7-943a-4504-b7ba-d608b7bd8002
e86b4632-9679-4f42-9fd5-9516fb53b749	9cb0263d-e4e7-4aa3-b930-5af06b3b2e58
f1f9a9ae-bb68-43e9-8558-4b8b1ec188bf	4eb9d7b7-943a-4504-b7ba-d608b7bd8002
f1f9a9ae-bb68-43e9-8558-4b8b1ec188bf	9db1b657-d184-48a6-adfa-83abe85685a3
f1f9a9ae-bb68-43e9-8558-4b8b1ec188bf	751d5937-61d4-4b15-85d4-5d567bbea25b
f1f9a9ae-bb68-43e9-8558-4b8b1ec188bf	8726a8db-5a75-4911-b46b-498d8273a12d
\.


--
-- Name: sys_role PK_12875ba0686cf845f353704dc7b; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_role
    ADD CONSTRAINT "PK_12875ba0686cf845f353704dc7b" PRIMARY KEY (id);


--
-- Name: sys_action PK_43e1cf65c5bc7aba4950d7d200a; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_action
    ADD CONSTRAINT "PK_43e1cf65c5bc7aba4950d7d200a" PRIMARY KEY (id);


--
-- Name: sys_account_organization PK_491821ec999107708cd77be387a; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_organization
    ADD CONSTRAINT "PK_491821ec999107708cd77be387a" PRIMARY KEY (organization_id, account_id);


--
-- Name: sys_account_role PK_7aa1592803617f58d5185669b76; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_role
    ADD CONSTRAINT "PK_7aa1592803617f58d5185669b76" PRIMARY KEY (role_id, account_id);


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
-- Name: sys_role_action PK_92a6c9b28e4cbb05b896fd1c9df; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_role_action
    ADD CONSTRAINT "PK_92a6c9b28e4cbb05b896fd1c9df" PRIMARY KEY (role_id, action_id);


--
-- Name: sys_organization PK_9e88b7e4bcec4b41f17bc17ac1a; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_organization
    ADD CONSTRAINT "PK_9e88b7e4bcec4b41f17bc17ac1a" PRIMARY KEY (id);


--
-- Name: sys_account UQ_056ebf4666d45f1ff052ef3c137; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account
    ADD CONSTRAINT "UQ_056ebf4666d45f1ff052ef3c137" UNIQUE (email);


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
-- Name: sys_organization sys_organization_code_key; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_organization
    ADD CONSTRAINT sys_organization_code_key UNIQUE (code);


--
-- Name: sys_organization unique_code; Type: CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_organization
    ADD CONSTRAINT unique_code UNIQUE (code);


--
-- Name: IDX_04a9ddbf006cb199188ef87c3c; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_04a9ddbf006cb199188ef87c3c" ON public.sys_account_role USING btree (account_id);


--
-- Name: IDX_056ebf4666d45f1ff052ef3c13; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_056ebf4666d45f1ff052ef3c13" ON public.sys_account USING btree (email);


--
-- Name: IDX_12875ba0686cf845f353704dc7; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_12875ba0686cf845f353704dc7" ON public.sys_role USING btree (id);


--
-- Name: IDX_43e1cf65c5bc7aba4950d7d200; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_43e1cf65c5bc7aba4950d7d200" ON public.sys_action USING btree (id);


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
-- Name: IDX_8f4f50339a346f5e5e1ddea153; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_8f4f50339a346f5e5e1ddea153" ON public.sys_role_action USING btree (action_id);


--
-- Name: IDX_9e88b7e4bcec4b41f17bc17ac1; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_9e88b7e4bcec4b41f17bc17ac1" ON public.sys_organization USING btree (id);


--
-- Name: IDX_a2943f31631f71555e5091758e; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_a2943f31631f71555e5091758e" ON public.sys_account_organization USING btree (account_id);


--
-- Name: IDX_c698f1748824c62f93b24b4fb0; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_c698f1748824c62f93b24b4fb0" ON public.sys_account_organization USING btree (organization_id);


--
-- Name: IDX_cf51756dc07761fea6b351e061; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_cf51756dc07761fea6b351e061" ON public.sys_role USING btree (code);


--
-- Name: IDX_da69b984c3b2158d7c9608563d; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_da69b984c3b2158d7c9608563d" ON public.sys_account USING btree (username);


--
-- Name: IDX_e2bb95c4d700346c6de2db5e87; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_e2bb95c4d700346c6de2db5e87" ON public.sys_account_role USING btree (role_id);


--
-- Name: IDX_f04c903790aee50a9b533c1db0; Type: INDEX; Schema: public; Owner: sora
--

CREATE INDEX "IDX_f04c903790aee50a9b533c1db0" ON public.sys_role_action USING btree (role_id);


--
-- Name: sys_account_role FK_04a9ddbf006cb199188ef87c3cc; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_role
    ADD CONSTRAINT "FK_04a9ddbf006cb199188ef87c3cc" FOREIGN KEY (account_id) REFERENCES public.sys_account(id);


--
-- Name: sys_menu FK_7cef4adcf9b01b2c6f14d52b0f3; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_menu
    ADD CONSTRAINT "FK_7cef4adcf9b01b2c6f14d52b0f3" FOREIGN KEY (parent_id) REFERENCES public.sys_menu(id);


--
-- Name: sys_role_action FK_8f4f50339a346f5e5e1ddea1536; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_role_action
    ADD CONSTRAINT "FK_8f4f50339a346f5e5e1ddea1536" FOREIGN KEY (action_id) REFERENCES public.sys_action(id);


--
-- Name: sys_account_organization FK_a2943f31631f71555e5091758e1; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_organization
    ADD CONSTRAINT "FK_a2943f31631f71555e5091758e1" FOREIGN KEY (account_id) REFERENCES public.sys_account(id);


--
-- Name: sys_action FK_a94fc5271d55503b425df6db099; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_action
    ADD CONSTRAINT "FK_a94fc5271d55503b425df6db099" FOREIGN KEY (menu_id) REFERENCES public.sys_menu(id);


--
-- Name: sys_account_organization FK_c698f1748824c62f93b24b4fb09; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_organization
    ADD CONSTRAINT "FK_c698f1748824c62f93b24b4fb09" FOREIGN KEY (organization_id) REFERENCES public.sys_organization(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sys_account_role FK_e2bb95c4d700346c6de2db5e878; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_account_role
    ADD CONSTRAINT "FK_e2bb95c4d700346c6de2db5e878" FOREIGN KEY (role_id) REFERENCES public.sys_role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sys_role_action FK_f04c903790aee50a9b533c1db03; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_role_action
    ADD CONSTRAINT "FK_f04c903790aee50a9b533c1db03" FOREIGN KEY (role_id) REFERENCES public.sys_role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sys_organization FK_f76dc95234989871b19ac37baf0; Type: FK CONSTRAINT; Schema: public; Owner: sora
--

ALTER TABLE ONLY public.sys_organization
    ADD CONSTRAINT "FK_f76dc95234989871b19ac37baf0" FOREIGN KEY (parent_id) REFERENCES public.sys_organization(id);


--
-- PostgreSQL database dump complete
--

