function paginatedResults(model){


    return async(req , res , next) => {

        const page = parseInt(req.query.page);
        var limit = parseInt(req.query.limit);

        const totalPosts = await model.countDocuments().exec();

        // here I considered searching from behind that actually means that say if I need to fetch 5 posts then I will fetch the last five posts hence the starting index refer to the index that is at most 5 index behind the endIndex ... as 5 => limit


        var startingIndex = (totalPosts - (page * limit));

        const results = {};

        if(startingIndex > 0){

            results.next = {

                page : page + 1,
                limit : limit,

            }

        }else{

            limit += startingIndex;
            startingIndex = 0;

        }

        try {

            results.result = await model.find().limit(limit).skip(startingIndex).exec();

            results.result.reverse();
    
            res.paginatedResults = results;
    
            next();
            
        } catch (error) {
            console.log({error : error});
            return res.status(400).json({message : error.message});
        }


    }

}

module.exports = paginatedResults;