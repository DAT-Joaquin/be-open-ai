import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/role/roles.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard), ApiBearerAuth());
}
