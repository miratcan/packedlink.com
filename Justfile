set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

backend_dir := "src/backend"
frontend_dir := "src/frontend"

_default:
    just --list

run:
    cd {{backend_dir}} && uv run python manage.py runserver

dev:
    cd {{frontend_dir}} && npm run dev

storybook:
    cd {{frontend_dir}} && npm run storybook

migrate:
    cd {{backend_dir}} && uv run python manage.py migrate

makemigrations:
    cd {{backend_dir}} && uv run python manage.py makemigrations

test:
    cd {{backend_dir}} && uv run pytest

shell:
    cd {{backend_dir}} && uv run python manage.py shell

expire:
    cd {{backend_dir}} && uv run python manage.py expire_lists

# Test komutları
test-e2e:
    python src/tests/test_orchestrator.py --type e2e

test-all:
    python src/tests/test_orchestrator.py --type all

test-debug:
    python src/tests/test_orchestrator.py --type e2e --verbose --keep-alive

test-unit:
    python src/tests/test_orchestrator.py --type unit

test-frontend:
    python src/tests/test_orchestrator.py --type frontend

# Temizlik
clean:
    rm -rf test-results/ playwright-report/ .pytest_cache/
    rm -f src/backend/test_db.sqlite3
    find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
