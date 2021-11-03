# Rust installation steps

## Install Rust on Mac by typing the following in a terminal

```
curl -sSf https://static.rust-lang.org/rustup.sh | sh
```

## Install using an installer for Windows

[https://www.rust-lang.org/downloads.html](https://www.rust-lang.org/downloads.html)

## Verify installation

Type the following to verify install 

```
rustc --version
```

## Install Rust support in Atom (if you wish)

```
Packages -> Command Palette -> Toggle
Type install -> Install Packages and Themes
atom-language-rust -> Click Install
```

## Compile with 

```
rustc rusttut.rs -A warnings
```

and then to run the resulting executeable:  `./rusttut` or `rusttut.exe` on Windows
