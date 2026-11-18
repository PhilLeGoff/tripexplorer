# Component provenance

The original project history is retained. This consolidation imports ordinary source directories rather than Git submodule pointers.

- **frontend**: [PhilLeGoff/front-tripexplorer](https://github.com/PhilLeGoff/front-tripexplorer), source revision `cde5c2f39d6619bbbd693c1b4a0bb9f7d9814c3f`.
- **backend**: [PhilLeGoff/back-tripexplorer](https://github.com/PhilLeGoff/back-tripexplorer), source revision `c455761f4d3a428dd12163b6663884e28250e89d`.

The backend import also preserves two pre-existing local changes: an import in `src/json_encoder.py` and an import in `src/json_renderer.py`. Original working directories were not changed. Empty placeholder files in the former root `frontend` and `backend` directories were not treated as application source.

The separate component repositories remain intact. Their detailed histories are available at the links above; this repository retains its own existing history and adds a normal consolidation commit.
