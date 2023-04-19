import { ADMIN_DEFAULT_PASSWORD, SALT_ROUNDS } from '../src/utils/config';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const usersData: any[] = [
    {
        username: 'admin',
        passwd: ADMIN_DEFAULT_PASSWORD,
        role: Role.ADMIN
    }, {
        username: 'user',
        passwd: 'password',
        role: Role.USER
    }
];

const main = async () => {
    console.log('Start seeding...') 
    /*for (const _user of usersData) {
        const user = await prisma.user.upsert({
            where: {
                username: _user.username
            },
            update: {
            },
            create: {
                username: _user.username,
                hash: await bcrypt.hash(_user.passwd, SALT_ROUNDS),
                role: _user.role
            }
        });
        
        console.log(`Created user with id: ${user.id}.`);
    }*/
    await Promise.all(
        usersData.map(async (_user) => {
            const user = prisma.user.upsert({
                where: {
                    username: _user.username
                },
                update: {
                },
                create: {
                    username: _user.username,
                    hash: await bcrypt.hash(_user.passwd, SALT_ROUNDS),
                    role: _user.role
                }
            })

            return user;
        })
    );
    console.log('Seeding done.');
  }

main()
    .catch(e => {
        console.error('foo', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })