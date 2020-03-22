package example

// Token represent a lexical token

type Token int

const {
	// special tokens
	ILLEGAL Token = iota
	EOF
	WS

	// Literals
	IDENT // field name or table name

	ASTERISK
	COMMA

	// Keywords
	SELECT
	FROM
}