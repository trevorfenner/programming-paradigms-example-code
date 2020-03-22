package example

import (
	"fmt"
	"io"
)

// represent an SQL SELECT statement

type SelectStatement struct {
	Fields []string
	TableName string
}

type Parser struct {
	s *Scanner
	buf struct {
		tok Token 	// last read token
		lit string 	// last read literal
		n int 		// buffer size
	}
}

func NewParser(r io.Reader) *Parser {
	return &Parser{s: NewScanner(r)}
}

// Parse an SQL statement
func (p *Parser) Parse() (*SelectStatement, error){
	stmt := &SelectStatement{}

	// The first token should be the keyword "SELECT"
	if tok, lit := p.scanIgnoreWhitespace(); tok != SELECT {
		return nil, fmt.Errorf("Found %q, expected SELECT", lit)
	}

	// loop over comma-delimited fields
	for {
		tok, lit := p.scanIgnoreWhitespace()
		if tok != IDENT && tok != ASTERISK {
			return nil, fmt.Errorf("Found %q, expected field", lit)
		}
		stmt.Fields = append(stmt.Fields, lit)

		if tok,_ := p.scanIgnoreWhitespace(); tok != COMMA {
			p.unscan()
			break
		}
	}

	// We should now see the "FROM" keyword
	if tok, lit := p.scanIgnoreWhitespace(); tok != FROM {
		return nil, fmt.Errorf("Found %q, expected FROM", lit)
	}

	// Read the table name
	tok, lit := p.scanIgnoreWhitespace()
	if tok != IDENT {
		return nil, fmt.Errorf("Found %q, expected table name", lit)
	}
	stmt.TableName = lit

	// return the parsed statement
	return stmt, nil
}

func (p *Parser) scanIgnoreWhitespace() (tok Token, lit string){
	tok, lit = p.scan()
	if (tok == WS){
		tok, lit = p,scan()
	}
	return
}

// unscan - pushes the previously read token back into the buffer.
func (p *Parser) unscan() {p.buf.n = 1}