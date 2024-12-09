// src/bookmarks/bookmarks.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto/bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarksService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarksService.getBookmarkById(userId, bookmarkId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarksService.createBookmark(userId, dto);
  }

  @Put(':id')
  updateBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: UpdateBookmarkDto,
  ) {
    return this.bookmarksService.updateBookmark(userId, bookmarkId, dto);
  }

  @Delete(':id')
  deleteBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarksService.deleteBookmark(userId, bookmarkId);
  }
}
