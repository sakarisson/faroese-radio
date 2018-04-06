--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 9.6.6

-- Started on 2018-04-06 11:34:26 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2429 (class 1262 OID 24586)
-- Name: faroese-radio; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "faroese-radio" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';


ALTER DATABASE "faroese-radio" OWNER TO postgres;

\connect -reuse-previous=on "dbname='faroese-radio'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12655)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2431 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 188 (class 1259 OID 24618)
-- Name: artists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE artists (
    id bigint NOT NULL,
    name text NOT NULL
);


ALTER TABLE artists OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 24616)
-- Name: artists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE artists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE artists_id_seq OWNER TO postgres;

--
-- TOC entry 2432 (class 0 OID 0)
-- Dependencies: 187
-- Name: artists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE artists_id_seq OWNED BY artists.id;


--
-- TOC entry 192 (class 1259 OID 24640)
-- Name: song_plays; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE song_plays (
    id bigint NOT NULL,
    fk_songs bigint NOT NULL,
    time_played timestamp with time zone DEFAULT now() NOT NULL,
    fk_stations bigint NOT NULL
);


ALTER TABLE song_plays OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 24638)
-- Name: song_plays_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE song_plays_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE song_plays_id_seq OWNER TO postgres;

--
-- TOC entry 2433 (class 0 OID 0)
-- Dependencies: 191
-- Name: song_plays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE song_plays_id_seq OWNED BY song_plays.id;


--
-- TOC entry 190 (class 1259 OID 24629)
-- Name: songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE songs (
    id bigint NOT NULL,
    title text NOT NULL,
    fk_artists bigint NOT NULL
);


ALTER TABLE songs OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 24627)
-- Name: songs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE songs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE songs_id_seq OWNER TO postgres;

--
-- TOC entry 2434 (class 0 OID 0)
-- Dependencies: 189
-- Name: songs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE songs_id_seq OWNED BY songs.id;


--
-- TOC entry 186 (class 1259 OID 24589)
-- Name: stations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE stations (
    id bigint NOT NULL,
    short_name text NOT NULL,
    long_name text
);


ALTER TABLE stations OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 24587)
-- Name: stations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE stations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stations_id_seq OWNER TO postgres;

--
-- TOC entry 2435 (class 0 OID 0)
-- Dependencies: 185
-- Name: stations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE stations_id_seq OWNED BY stations.id;


--
-- TOC entry 2289 (class 2604 OID 24621)
-- Name: artists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY artists ALTER COLUMN id SET DEFAULT nextval('artists_id_seq'::regclass);


--
-- TOC entry 2291 (class 2604 OID 24643)
-- Name: song_plays id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY song_plays ALTER COLUMN id SET DEFAULT nextval('song_plays_id_seq'::regclass);


--
-- TOC entry 2290 (class 2604 OID 24632)
-- Name: songs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY songs ALTER COLUMN id SET DEFAULT nextval('songs_id_seq'::regclass);


--
-- TOC entry 2288 (class 2604 OID 24592)
-- Name: stations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY stations ALTER COLUMN id SET DEFAULT nextval('stations_id_seq'::regclass);


--
-- TOC entry 2298 (class 2606 OID 24663)
-- Name: artists artists_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY artists
    ADD CONSTRAINT artists_name_unique UNIQUE (name);


--
-- TOC entry 2300 (class 2606 OID 24626)
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- TOC entry 2304 (class 2606 OID 24645)
-- Name: song_plays song_plays_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY song_plays
    ADD CONSTRAINT song_plays_pkey PRIMARY KEY (id);


--
-- TOC entry 2302 (class 2606 OID 24637)
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- TOC entry 2294 (class 2606 OID 24597)
-- Name: stations stations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY stations
    ADD CONSTRAINT stations_pkey PRIMARY KEY (id);


--
-- TOC entry 2296 (class 2606 OID 24599)
-- Name: stations stations_short_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY stations
    ADD CONSTRAINT stations_short_name_unique UNIQUE (short_name);


--
-- TOC entry 2306 (class 2606 OID 24674)
-- Name: song_plays song_plays_fk_songs; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY song_plays
    ADD CONSTRAINT song_plays_fk_songs FOREIGN KEY (fk_songs) REFERENCES songs(id) ON DELETE CASCADE;


--
-- TOC entry 2307 (class 2606 OID 24684)
-- Name: song_plays song_plays_fk_stations; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY song_plays
    ADD CONSTRAINT song_plays_fk_stations FOREIGN KEY (fk_stations) REFERENCES stations(id) ON DELETE CASCADE;


--
-- TOC entry 2305 (class 2606 OID 24679)
-- Name: songs songs_fk_artists; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY songs
    ADD CONSTRAINT songs_fk_artists FOREIGN KEY (fk_artists) REFERENCES artists(id) ON DELETE CASCADE;


-- Completed on 2018-04-06 11:34:26 EEST

--
-- PostgreSQL database dump complete
--

