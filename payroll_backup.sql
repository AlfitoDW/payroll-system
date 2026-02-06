--
-- PostgreSQL database dump
--

\restrict dGc9Sw71NSB3ymBfm75vuolFVzd2u7BNBA6UUZtJJHWp8vLlB76dMAXnr4GwfSN

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.20 (Homebrew)

-- Started on 2026-02-06 14:41:31 WIB

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 17992)
-- Name: cache; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO inyongscoobydoo;

--
-- TOC entry 216 (class 1259 OID 17999)
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO inyongscoobydoo;

--
-- TOC entry 225 (class 1259 OID 18050)
-- Name: employees; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.employees (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "position" character varying(255) NOT NULL,
    salary numeric(12,2) NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.employees OWNER TO inyongscoobydoo;

--
-- TOC entry 224 (class 1259 OID 18049)
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: inyongscoobydoo
--

CREATE SEQUENCE public.employees_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_id_seq OWNER TO inyongscoobydoo;

--
-- TOC entry 3925 (class 0 OID 0)
-- Dependencies: 224
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inyongscoobydoo
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- TOC entry 221 (class 1259 OID 18024)
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO inyongscoobydoo;

--
-- TOC entry 220 (class 1259 OID 18023)
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: inyongscoobydoo
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.failed_jobs_id_seq OWNER TO inyongscoobydoo;

--
-- TOC entry 3926 (class 0 OID 0)
-- Dependencies: 220
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inyongscoobydoo
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- TOC entry 219 (class 1259 OID 18016)
-- Name: job_batches; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO inyongscoobydoo;

--
-- TOC entry 218 (class 1259 OID 18007)
-- Name: jobs; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO inyongscoobydoo;

--
-- TOC entry 217 (class 1259 OID 18006)
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: inyongscoobydoo
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO inyongscoobydoo;

--
-- TOC entry 3927 (class 0 OID 0)
-- Dependencies: 217
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inyongscoobydoo
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- TOC entry 210 (class 1259 OID 17959)
-- Name: migrations; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO inyongscoobydoo;

--
-- TOC entry 209 (class 1259 OID 17958)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: inyongscoobydoo
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO inyongscoobydoo;

--
-- TOC entry 3928 (class 0 OID 0)
-- Dependencies: 209
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inyongscoobydoo
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 213 (class 1259 OID 17976)
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO inyongscoobydoo;

--
-- TOC entry 227 (class 1259 OID 18066)
-- Name: payrolls; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.payrolls (
    id bigint NOT NULL,
    employee_id bigint NOT NULL,
    month character varying(255) NOT NULL,
    basic_salary bigint NOT NULL,
    allowance bigint DEFAULT '0'::bigint NOT NULL,
    deduction bigint DEFAULT '0'::bigint NOT NULL,
    total_salary bigint NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    paid_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.payrolls OWNER TO inyongscoobydoo;

--
-- TOC entry 226 (class 1259 OID 18065)
-- Name: payrolls_id_seq; Type: SEQUENCE; Schema: public; Owner: inyongscoobydoo
--

CREATE SEQUENCE public.payrolls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payrolls_id_seq OWNER TO inyongscoobydoo;

--
-- TOC entry 3929 (class 0 OID 0)
-- Dependencies: 226
-- Name: payrolls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inyongscoobydoo
--

ALTER SEQUENCE public.payrolls_id_seq OWNED BY public.payrolls.id;


--
-- TOC entry 223 (class 1259 OID 18036)
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name text NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO inyongscoobydoo;

--
-- TOC entry 222 (class 1259 OID 18035)
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: inyongscoobydoo
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personal_access_tokens_id_seq OWNER TO inyongscoobydoo;

--
-- TOC entry 3930 (class 0 OID 0)
-- Dependencies: 222
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inyongscoobydoo
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- TOC entry 214 (class 1259 OID 17983)
-- Name: sessions; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO inyongscoobydoo;

--
-- TOC entry 212 (class 1259 OID 17966)
-- Name: users; Type: TABLE; Schema: public; Owner: inyongscoobydoo
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    role character varying(255) DEFAULT 'user'::character varying NOT NULL,
    employee_id bigint,
    avatar character varying(255)
);


ALTER TABLE public.users OWNER TO inyongscoobydoo;

--
-- TOC entry 211 (class 1259 OID 17965)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: inyongscoobydoo
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO inyongscoobydoo;

--
-- TOC entry 3931 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inyongscoobydoo
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3717 (class 2604 OID 18053)
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- TOC entry 3714 (class 2604 OID 18027)
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- TOC entry 3713 (class 2604 OID 18010)
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- TOC entry 3710 (class 2604 OID 17962)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3718 (class 2604 OID 18069)
-- Name: payrolls id; Type: DEFAULT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.payrolls ALTER COLUMN id SET DEFAULT nextval('public.payrolls_id_seq'::regclass);


--
-- TOC entry 3716 (class 2604 OID 18039)
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- TOC entry 3711 (class 2604 OID 17969)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3907 (class 0 OID 17992)
-- Dependencies: 215
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.cache (key, value, expiration) FROM stdin;
\.


--
-- TOC entry 3908 (class 0 OID 17999)
-- Dependencies: 216
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- TOC entry 3917 (class 0 OID 18050)
-- Dependencies: 225
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.employees (id, name, email, "position", salary, user_id, created_at, updated_at) FROM stdin;
1	Akmal	Akmal@gmail.com	Boss	3000000.00	1	2026-02-05 07:27:54	2026-02-06 01:15:01
2	Arya	Arya@gmail.com	CEO	20000000.00	1	2026-02-06 02:26:02	2026-02-06 02:26:02
\.


--
-- TOC entry 3913 (class 0 OID 18024)
-- Dependencies: 221
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- TOC entry 3911 (class 0 OID 18016)
-- Dependencies: 219
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- TOC entry 3910 (class 0 OID 18007)
-- Dependencies: 218
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- TOC entry 3902 (class 0 OID 17959)
-- Dependencies: 210
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2026_01_01_190346_create_personal_access_tokens_table	1
5	2026_01_01_200213_add_role_to_users_table	1
6	2026_01_02_172606_create_employees_table	1
7	2026_01_05_112141_create_payrolls_table	1
8	2026_01_14_132541_add_role_and_employee_id_to_users	1
9	2026_02_04_062407_add_avatar_to_users_table	1
\.


--
-- TOC entry 3905 (class 0 OID 17976)
-- Dependencies: 213
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- TOC entry 3919 (class 0 OID 18066)
-- Dependencies: 227
-- Data for Name: payrolls; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.payrolls (id, employee_id, month, basic_salary, allowance, deduction, total_salary, status, paid_at, created_at, updated_at) FROM stdin;
1	1	2026-02	3000000	2500000	0	5500000	paid	2026-02-05 08:22:15	2026-02-05 08:22:12	2026-02-05 08:22:15
2	2	2026-02	20000000	0	0	20000000	pending	\N	2026-02-06 02:26:17	2026-02-06 02:26:17
\.


--
-- TOC entry 3915 (class 0 OID 18036)
-- Dependencies: 223
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
7	App\\Models\\User	1	auth_token	0ddb7f87de866b7045273b74fd5803d725d359ee4f6171c028abf63a3b16efc6	["*"]	2026-02-06 02:27:04	\N	2026-02-06 01:12:10	2026-02-06 02:27:04
6	App\\Models\\User	1	auth_token	0691aa3e27f83194ca21ad54f44c9c96bcea838a42f5c895859e6ea5776583e5	["*"]	2026-02-05 09:00:14	\N	2026-02-05 08:52:32	2026-02-05 09:00:14
4	App\\Models\\User	1	auth_token	b6f35a11181a9e1aa5c339f2580bc544d42caaf67dcf6fa26880fdd921c637d4	["*"]	2026-02-05 08:27:43	\N	2026-02-05 08:21:40	2026-02-05 08:27:43
1	App\\Models\\User	1	auth_token	e34f3ce7be5e015ab0ecc3ef371b257f9d3dcdcd9ce2a48753c36e3517141b46	["*"]	2026-02-05 07:28:39	\N	2026-02-05 07:27:25	2026-02-05 07:28:39
9	App\\Models\\User	2	auth_token	f48d8772bcacb3f981f0d4e9373a09bc048f3f24d0c6bfd7cbd0c6ab3bc37a3b	["*"]	2026-02-06 01:57:07	\N	2026-02-06 01:13:33	2026-02-06 01:57:07
2	App\\Models\\User	2	auth_token	305515d05fe2bf97a146babc80d8340b42d4159a628224a27fd342e69e037883	["*"]	2026-02-05 07:29:36	\N	2026-02-05 07:29:10	2026-02-05 07:29:36
3	App\\Models\\User	2	auth_token	68b569183926427df6ac3a35ecb11d0e1ea301e84420999afda05a33a9acc865	["*"]	2026-02-05 08:51:20	\N	2026-02-05 07:33:55	2026-02-05 08:51:20
8	App\\Models\\User	2	auth_token	943ac8528511e79143386d5ec07e0cca494c9f5e8b6006dd3f4fba3b56dcaf0d	["*"]	2026-02-06 01:13:17	\N	2026-02-06 01:12:45	2026-02-06 01:13:17
5	App\\Models\\User	1	auth_token	20a504ea655a2a8898667f4b227d089a0e270ffaf398ed6efff78c9c51474004	["*"]	2026-02-05 08:51:55	\N	2026-02-05 08:51:37	2026-02-05 08:51:55
\.


--
-- TOC entry 3906 (class 0 OID 17983)
-- Dependencies: 214
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
eWXKaddN5pspmqUefyv5QguqOdBYnoxXm9YThSvj	\N	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	YTozOntzOjY6Il90b2tlbiI7czo0MDoibmdpV2xtNGFmZU1GNWZ6aGNZejk2UkV4VFRpc1VtS0tKbDBXYVJ5WiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==	1770340251
\.


--
-- TOC entry 3904 (class 0 OID 17966)
-- Dependencies: 212
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: inyongscoobydoo
--

COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role, employee_id, avatar) FROM stdin;
2	Akmal	Akmal@gmail.com	\N	$2y$12$3/qImOeYKreFGM2uiXJca.tzzu7bqDgZBVNQcDCNve9geprfx.0Li	\N	2026-02-05 07:28:17	2026-02-06 01:12:57	employee	1	avatars/WrirVepN8VTgv5I5hSYnneGBT5OZOPRX6UsUrSz9.png
1	Admin	admin@mail.com	\N	$2y$12$p1bHvhUYoiUAh3RU4gJ/GOal4eZ4UQfgkogLI9XaTIzh8uWU7kC9.	\N	2026-02-05 07:26:49	2026-02-06 01:36:52	admin	\N	avatars/B9w81cNW1o8YDJXcXdfbvJXvNrJF6YkUG3TIZczY.png
\.


--
-- TOC entry 3932 (class 0 OID 0)
-- Dependencies: 224
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inyongscoobydoo
--

SELECT pg_catalog.setval('public.employees_id_seq', 2, true);


--
-- TOC entry 3933 (class 0 OID 0)
-- Dependencies: 220
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inyongscoobydoo
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- TOC entry 3934 (class 0 OID 0)
-- Dependencies: 217
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inyongscoobydoo
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- TOC entry 3935 (class 0 OID 0)
-- Dependencies: 209
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inyongscoobydoo
--

SELECT pg_catalog.setval('public.migrations_id_seq', 9, true);


--
-- TOC entry 3936 (class 0 OID 0)
-- Dependencies: 226
-- Name: payrolls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inyongscoobydoo
--

SELECT pg_catalog.setval('public.payrolls_id_seq', 2, true);


--
-- TOC entry 3937 (class 0 OID 0)
-- Dependencies: 222
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inyongscoobydoo
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 9, true);


--
-- TOC entry 3938 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inyongscoobydoo
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- TOC entry 3737 (class 2606 OID 18005)
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- TOC entry 3735 (class 2606 OID 17998)
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- TOC entry 3754 (class 2606 OID 18064)
-- Name: employees employees_email_unique; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_unique UNIQUE (email);


--
-- TOC entry 3756 (class 2606 OID 18057)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- TOC entry 3744 (class 2606 OID 18032)
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 3746 (class 2606 OID 18034)
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- TOC entry 3742 (class 2606 OID 18022)
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- TOC entry 3739 (class 2606 OID 18014)
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 3723 (class 2606 OID 17964)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3729 (class 2606 OID 17982)
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- TOC entry 3758 (class 2606 OID 18076)
-- Name: payrolls payrolls_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.payrolls
    ADD CONSTRAINT payrolls_pkey PRIMARY KEY (id);


--
-- TOC entry 3749 (class 2606 OID 18043)
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3751 (class 2606 OID 18046)
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- TOC entry 3732 (class 2606 OID 17989)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3725 (class 2606 OID 17975)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 3727 (class 2606 OID 17973)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3740 (class 1259 OID 18015)
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: inyongscoobydoo
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- TOC entry 3747 (class 1259 OID 18047)
-- Name: personal_access_tokens_expires_at_index; Type: INDEX; Schema: public; Owner: inyongscoobydoo
--

CREATE INDEX personal_access_tokens_expires_at_index ON public.personal_access_tokens USING btree (expires_at);


--
-- TOC entry 3752 (class 1259 OID 18044)
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: inyongscoobydoo
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- TOC entry 3730 (class 1259 OID 17991)
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: inyongscoobydoo
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- TOC entry 3733 (class 1259 OID 17990)
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: inyongscoobydoo
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- TOC entry 3760 (class 2606 OID 18058)
-- Name: employees employees_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3761 (class 2606 OID 18077)
-- Name: payrolls payrolls_employee_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.payrolls
    ADD CONSTRAINT payrolls_employee_id_foreign FOREIGN KEY (employee_id) REFERENCES public.employees(id) ON DELETE CASCADE;


--
-- TOC entry 3759 (class 2606 OID 18082)
-- Name: users users_employee_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: inyongscoobydoo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_employee_id_foreign FOREIGN KEY (employee_id) REFERENCES public.employees(id);


-- Completed on 2026-02-06 14:41:31 WIB

--
-- PostgreSQL database dump complete
--

\unrestrict dGc9Sw71NSB3ymBfm75vuolFVzd2u7BNBA6UUZtJJHWp8vLlB76dMAXnr4GwfSN

