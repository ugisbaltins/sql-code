import { Database } from "../src/database";
import { minutes } from "./utils";

describe("Queries Across Tables", () => {
    let db: Database;

    beforeAll(async () => {
        db = await Database.fromExisting("03", "04");
    }, minutes(1));

    it("should select count of apps which have free pricing plan", async done => {
        const query = `SELECT COUNT(*) as count
        FROM ( SELECT apps.id FROM apps
        JOIN APPS_PRICING_PLANS ON apps.id = apps_pricing_plans.app_id
        JOIN PRICING_PLANS ON apps_pricing_plans.pricing_plan_id = pricing_plans.id
        WHERE pricing_plans.price LIKE 'Free%') AS free_apps;`;
        const result = await db.selectSingleRow(query);
        expect(result).toEqual({
            count: 1112
        });
        done();
    }, minutes(1));

    it("should select top 3 most common categories", async done => {
        const query = `SELECT COUNT(*) AS count, categories.title AS category FROM categories
        JOIN APPS_CATEGORIES ON categories.id = apps_categories.category_id
        JOIN APPS ON apps_categories.app_id = apps.id
        GROUP BY categories.title ORDER BY count DESC LIMIT 3;`;
        const result = await db.selectMultipleRows(query);
        expect(result).toEqual([
            { count: 1193, category: "Store design" },
            { count: 723, category: "Sales and conversion optimization" },
            { count: 629, category: "Marketing" }
        ]);
        done();
    }, minutes(1));

    it("should select top 3 prices by appearance in apps and in price range from $5 to $10 inclusive (not matters monthly or one time payment)", async done => {
        const query = `SELECT COUNT(*) AS count, 
        CAST(REPLACE(pp.price, '$', '') AS REAL) AS casted_price, 
        pp.price AS price
        FROM pricing_plans pp
        JOIN apps_pricing_plans app ON pp.id = app.pricing_plan_id
        WHERE CAST(REPLACE(pp.price, '$', '') AS REAL) BETWEEN 5 AND 10
        GROUP BY CAST(REPLACE(pp.price, '$', '') AS REAL)
        ORDER BY count DESC
        LIMIT 3;`;
        const result = await db.selectMultipleRows(query);
        expect(result).toEqual([
            { count: 225, price: "$9.99/month", casted_price: 9.99 },
            { count: 135, price: "$5/month", casted_price: 5 },
            { count: 114, price: "$10/month", casted_price: 10 }
        ]);
        done();
    }, minutes(1));
});