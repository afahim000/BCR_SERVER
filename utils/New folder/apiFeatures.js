class APIFeatures {
  //mongoose query and the express queryString from the route
  construstor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //Filtering
    //Copy. New Object
    const queryObj = { ...this.queryString };
    //Exclude terms for our Query
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    //Remove this fields from our query object
    excludedFields.forEach((el) => delete queryObj[el]);
    //Filter the DB. Query
    let queryString = JSON.stringify(queryObj);
    //regular expression to add $
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`
    );
    console.log(queryString);
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    //SORTING
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      //Default sort
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    //FIELD LIMITING
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      //Default limiting(exclusion field)
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    //PAGINATION
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
