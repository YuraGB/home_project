home project

## Required

    - Instalation Docker
    - in "composer.yaml" start "db"

It's because in "development" mode postgres comes from docker

## .env file is required

    NEXTAUTH_SECRET=***
    NEXTAUTH_URL=***

    POSTGRES_URL=****
    POSTGRES_LOCAL_URL=postgresql://postgres:password@localhost:5432/hp?schema=public

POSTGRES_URL -> production
POSTGRES_LOCAL_URL -> from the local env. will be coming from docker
