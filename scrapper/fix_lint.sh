#!/usr/bin/env bash
black .
isort .
flake8 --select=F