import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RequestContextModule } from 'nestjs-request-context';
import { HttpGuard } from 'libs/middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/jwt-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Account, Profile } from 'libs/entities';
import { NotificationModule } from './notification/notification.module';
import { ScoreModule } from './score/score.module';
import { GradeModule } from './grade/grade.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { SemesterModule } from './semester/semester.module';

@Module({
  imports: [
    RequestContextModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([Profile, Account]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/**/**.entity{.ts,.js}'],
      synchronize: false,
    }),

    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    AuthModule,
    NotificationModule,
    ScoreModule,
    GradeModule,
    ClassModule,
    StudentModule,
    SubjectModule,
    SemesterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: HttpGuard,
    },
  ],
})
export class AppModule {}
