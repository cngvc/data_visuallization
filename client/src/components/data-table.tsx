import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { CheckCircle2Icon } from 'lucide-react';
import React from 'react';
import TableSkeleton from './table-skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination?: PaginationState;
  isLoading?: boolean;
  error?: Error | null;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export function DataTable<T>({
  data,
  columns,
  pagination,
  isLoading = false,
  error = null,
  onPageChange,
  onLimitChange
}: DataTableProps<T>) {
  const generatePaginationItems = () => {
    if (!pagination || !onPageChange || !onLimitChange) return [];

    const items = [];
    const maxPages = pagination.pages;
    const currentPage = pagination.page;

    items.push(
      <PaginationItem key="page-1">
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(1);
          }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (maxPages <= 7) {
      for (let i = 2; i <= maxPages; i++) {
        items.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <span className="flex h-9 w-9 items-center justify-center">...</span>
          </PaginationItem>
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(maxPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < maxPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <span className="flex h-9 w-9 items-center justify-center">...</span>
          </PaginationItem>
        );
      }

      if (maxPages > 1) {
        items.push(
          <PaginationItem key={`page-${maxPages}`}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(maxPages);
              }}
              isActive={currentPage === maxPages}
            >
              {maxPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  const renderCellContent = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }

    return item[column.accessor as keyof T] as React.ReactNode;
  };

  return (
    <div className="overflow-hidden">
      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <Alert variant="destructive">
          <CheckCircle2Icon />
          <AlertTitle>Error loading data</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="overflow-x-auto border rounded-md ">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead key={index} className={column.className}>
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-4">
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item, rowIndex) => (
                    <TableRow key={rowIndex} className="odd:bg-muted/50">
                      {columns.map((column, colIndex) => (
                        <TableCell key={colIndex} className={`${cn(column.className)}`}>
                          {renderCellContent(item, column)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {pagination && onPageChange && onLimitChange && (
            <div className="flex items-center justify-between gap-4 flex-wrap py-4">
              <div className="text-sm text-gray-500">
                Showing {data.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
              </div>
              <div className="flex items-center space-x-6">
                <Select value={pagination.limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.page > 1) onPageChange(pagination.page - 1);
                        }}
                        aria-disabled={pagination.page === 1}
                        className={pagination.page === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>

                    {generatePaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.page < pagination.pages) onPageChange(pagination.page + 1);
                        }}
                        aria-disabled={pagination.page >= pagination.pages}
                        className={pagination.page >= pagination.pages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
