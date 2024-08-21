package com.springboot.picture.service;

import com.springboot.picture.entity.RewardPicture;
import com.springboot.picture.repository.RewardPictureRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class RewardPictureService {
    private final RewardPictureRepository rewardPictureRepository;

    public RewardPictureService(RewardPictureRepository rewardPictureRepository) {
        this.rewardPictureRepository = rewardPictureRepository;
    }

    public RewardPicture createRewardPicture(RewardPicture rewardPicture){
        return rewardPictureRepository.save(rewardPicture);
    }

}
