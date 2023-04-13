CREATE SCHEMA IF NOT EXISTS core;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA core;
CREATE TYPE core.users_state AS ENUM ('ACTIVATED', 'DELETED', 'DISABLED', 'PENDING');
CREATE TYPE core.users_type AS ENUM ('CLINICIAN', 'SYSADMIN');
CREATE TABLE IF NOT EXISTS core.users (
    id uuid DEFAULT core.uuid_generate_v4() NOT NULL,
    state core.users_state NOT NULL,
    type core.users_type NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone,
    organization_id uuid NOT NULL
);

INSERT INTO core.users (
    state, 
    type, 
    first_name, 
    last_name, 
    email, 
    password, 
    created_at, 
    modified_at, 
    deleted_at,
    organization_id
) 
VALUES(
    'ACTIVATED', 
    'CLINICIAN',
    'Leandro', 
    'Bustos', 
    'leandro@medirekor.com', 
    '$2a$12$6kyYpJIgUsq0pIdzjxL/sORMP1dTkmAc4d6LJhdR4kHBV67lq3bn2', 
    NOW(), 
    null, 
    null,
    'aa83fa0b-c088-4712-a812-bcd24266269c'
);