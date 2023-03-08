CREATE TABLE "public"."counter_table" ("id" serial NOT NULL, "value" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"));
