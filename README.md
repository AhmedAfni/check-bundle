# check-bundle

Check the bundle size and dependency count of any npm package — right from your terminal, before you install it.

No browser tab needed. No guessing whether that package is going to bloat your app.

## Why

Before adding a new package to a project, it helps to know how "heavy" it is. `check-bundle` gives you that answer instantly, without leaving your terminal.

## Usage

No installation needed — just run it with `npx`:

```bash
npx check-bundle axios
```

**Example output:**

```
Checking axios...
axios@1.18.0
Minified:     43.5 KB
Gzipped:      16.5 KB
Dependencies: 1
```

Output is color-coded based on gzipped size:
- 🟢 Green — under 20 KB (small)
- 🟡 Yellow — 20–100 KB (medium)
- 🔴 Red — over 100 KB (heavy)

## What it checks

- **Minified size** — the package's file size after minification
- **Gzipped size** — the size that actually matters for real-world load times
- **Dependency count** — how many other packages it pulls in

## How it works

`check-bundle` looks up the package on the [npm registry](https://registry.npmjs.org) to confirm it exists and get its latest version, then fetches size data from [Bundlephobia](https://bundlephobia.com).

## Installation (optional)

If you'd rather install it globally instead of using `npx` each time:

```bash
npm install -g check-bundle
check-bundle axios
```

## Tech stack

- Node.js
- [commander](https://www.npmjs.com/package/commander) — CLI argument parsing
- [chalk](https://www.npmjs.com/package/chalk) — terminal colors

## Roadmap

- [ ] Support for PyPI (Python) packages
- [ ] Support for Composer (PHP) packages
- [ ] Support for crates.io (Rust) packages
- [ ] Side-by-side comparison of two packages

## Contributing

Issues and pull requests are welcome. If you spot a bug or have an idea for a feature, feel free to open an issue.

## License

MIT