export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        // Create User in Postges
        const results = await PostgresHelper.query(
            'INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                createUserParams.id,
                createUserParams.first_name,
                createUserParams.last_name,
                createUserParams.email,
                createUserParams.password,
            ],
        )

        return results[0]
    }
}
