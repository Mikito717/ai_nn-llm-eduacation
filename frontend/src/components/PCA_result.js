import React from 'react'
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

const PCAResult = ({ data }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        PCA Result
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Component</TableCell>
              <TableCell>Variance Explained</TableCell>
              <TableCell>Cumulative Variance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{`PC${index + 1}`}</TableCell>
                <TableCell>{row.varianceExplained.toFixed(2)}%</TableCell>
                <TableCell>{row.cumulativeVariance.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default PCAResult
