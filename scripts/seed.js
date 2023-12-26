const { PrismaClient } = require('@prisma/client');

async function seedUsers(client) {
    try {
        const res = await client.user.create({
            data: {
                name: 'John Doe',
                email: 'user@example.com',
            },
        });

        return res;
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
};

async function seedContacts(client, userId) {
    try {
        const res1 = await client.contact.create({
            data: {
                name: 'Fancy Fenster',
                email: 'info@fanyfenster.com',
                phone: '+49 123 456 789',
                street: 'Fancy Street 1',
                city: 'Berlin',
                zipcode: '12345',
                country: 'Germany',
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        const res2 = await client.contact.create({
            data: {
                name: 'Big Corp',
                email: 'info@bigcorp.com',
                phone: '+49 987 654 321',
                street: 'Big Street 1',
                city: 'Cologne',
                zipcode: '54321',
                country: 'Germany',
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return [res1, res2];
    } catch (error) {
        console.error('Error seeding contact:', error);
        throw error;
    }
};

async function seedInvoices(client, userId, contact1, contact2) {
    try {
        const res1 = await client.invoice.create({
            data: {
                title: '2023-12-20 - ' + contact1.name,
                invoiceNo: '2023-0001',
                date: new Date('2023-12-20'),
                dueDate: new Date('2023-12-31'),
                contact: {
                    connect: {
                        id: contact1.id,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },

            },
        });
        const res2 = await client.invoice.create({
            data: {
                title: '2023-12-23 - ' + contact2.name,
                invoiceNo: '2023-0002',
                date: new Date('2023-12-23'),
                dueDate: new Date('2024-01-03'),
                contact: {
                    connect: {
                        id: contact2.id,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },

            },
        });


        return [res1, res2];
    } catch (error) {
        console.error('Error seeding invoices:', error);
        throw error;
    }
};

async function seedPositions(client, invoiceId) {
    try {
        const res1 = await client.position.create({
            data: {
                description: 'Kick-off meeting',
                quantity: 1,
                price: 40,
                tax: 19,
                total: 47.6,
                invoice: {
                    connect: {
                        id: invoiceId,
                    },
                },
            },
        });
        const res2 = await client.position.create({
            data: {
                description: 'Design',
                quantity: 2,
                price: 40,
                tax: 0,
                total: 80,
                invoice: {
                    connect: {
                        id: invoiceId,
                    },
                },
            },
        });
        const res3 = await client.position.create({
            data: {
                description: 'Development',
                quantity: 3,
                price: 40,
                tax: 19,
                total: 142.8,
                invoice: {
                    connect: {
                        id: invoiceId,
                    },
                },
            },
        });
        const res4 = await client.position.create({
            data: {
                description: 'Presentation',
                quantity: 1,
                price: 40,
                tax: 19,
                total: 47.6,
                invoice: {
                    connect: {
                        id: invoiceId,
                    },
                },
            },
        });


        return [res1, res2];
    } catch (error) {
        console.error('Error seeding positions:', error);
        throw error;
    }
};

async function main() {
    const client = new PrismaClient();

    await client.user.deleteMany();
    console.log('Deleted records in user table');
    await client.contact.deleteMany();
    console.log('Deleted records in contact table');
    await client.invoice.deleteMany();
    console.log('Deleted records in invoice table');
    await client.position.deleteMany();
    console.log('Deleted records in position table');

    const user = await seedUsers(client);
    const contacts = await seedContacts(client, user.id);
    const invoices = await seedInvoices(client, user.id, contacts[0], contacts[1]);
    invoices.forEach(async (invoice) => {
        await seedPositions(client, invoice.id);
    });

    await client.$disconnect();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});