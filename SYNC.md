# Syncing with Upstream

Since we have renamed all packages from `@ptc-org` to `@m8a`, syncing with the upstream repository (`https://github.com/m8a-io/nestjs-query.git`) requires a specific workflow to avoid merge conflicts and preserve our changes.

## Prerequisites

Ensure you have the `upstream` remote configured:
```bash
git remote -v
# Should show:
# upstream https://github.com/TriPSs/nestjs-query.git (fetch)
# upstream https://github.com/TriPSs/nestjs-query.git (push)
```

## Sync Workflow

1.  **Fetch Upstream Changes**
    ```bash
    git fetch upstream
    ```

2.  **Merge Upstream Master**
    ```bash
    git merge upstream/master
    ```
    *Expect conflicts.* The upstream repo still uses `@ptc-org` package names.

3.  **Resolve Conflicts**
    - Accept the upstream changes for logic/code.
    - **Re-apply the renaming**:
        - Run the bulk replace command again to ensure any new files or changes from upstream are converted to `@m8a`.
        ```bash
        find packages -type f -not -path '*/node_modules/*' -not -path '*/.git/*' -exec sed -i 's/@ptc-org\/nestjs-query/@m8a\/nestjs-query/g' {} +
        ```
    - Check `package.json` files to ensure `name` fields are correct (`@m8a/...`).

4.  **Verify**
    - Run `yarn install`
    - Run `nx run-many --target=build --all`
    - Run tests

    > **RDE note — Mongo-backed tests need `MONGOMS_DISTRO` on Wolfi.** The `query-mongoose` and
    > `query-typegoose` suites use `mongodb-memory-server`, which downloads/starts a real `mongod`.
    > The m8a RDE runs on **Wolfi** (glibc), whose `/etc/os-release` has `ID=wolfi` and no `ID_LIKE`,
    > so `mongodb-memory-server` can't detect a download URL and throws `UnknownLinuxDistro` — under
    > parallel Jest this looks like a multi-minute **hang** on the first Mongo-backed spec. Wolfi is
    > glibc, so a standard Ubuntu build runs fine; just tell mms which one to fetch:
    > ```bash
    > MONGOMS_DISTRO=ubuntu-2204 nx run-many --target=test --all
    > ```
    > (Or export `MONGOMS_DISTRO=ubuntu-2204` once in the RDE so every Mongo-backed suite works.)

5.  **Commit**
    ```bash
    git commit -am "Merge upstream and re-apply @m8a renaming"
    ```
