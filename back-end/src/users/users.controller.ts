import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query('role') role: string) {
    return `This action returns all users filtering by role: ${role}`;
  }

  // 2. GET ONE: /users/:id (Route Parameter)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns user with ID: ${id}`;
  }

  // 3. POST: /users (Creates a resource)
  @Post()
  create(@Body() createUserDto: any) {
    return `This action creates a new user`;
  }

  // 4. PUT: /users/:id (Updates a resource completely)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return `This action updates user ${id}`;
  }

  // 5. DELETE: /users/:id (Removes a resource)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes user ${id}`;
  }
}
