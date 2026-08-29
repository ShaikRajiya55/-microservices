#!/usr/bin/env python3
import os
import sqlite3
import tarfile

DATA_DIR = os.path.dirname(os.path.abspath(__file__))

def build_sqlite_db():
    db_path = os.path.join(DATA_DIR, "design_db.sqlite")
    sql_path = os.path.join(DATA_DIR, "seed_db.sql")
    if os.path.exists(db_path):
        os.remove(db_path)
    conn = sqlite3.connect(db_path)
    with open(sql_path, "r", encoding="utf-8") as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()
    print(f"Successfully generated database at {db_path}")

def build_tarball():
    tar_path = os.path.join(DATA_DIR, "picorv32-v1.0.tar.gz")
    verilog_path = os.path.join(DATA_DIR, "picorv32.v")
    with tarfile.open(tar_path, "w:gz") as tar:
        tar.add(verilog_path, arcname="picorv32.v")
    print(f"Successfully generated archive at {tar_path}")

if __name__ == "__main__":
    build_sqlite_db()
    build_tarball()
