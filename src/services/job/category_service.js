import axios from "axios";

class CategoryService {
    getCategory(company_id) {
        axios
            .get(`/jobs/company/get_category?company_id=${company_id}`)
            .then(response => {
                return "hello too"
            })
            .catch(err => {
                return err
            })

    }
}

export default new CategoryService();