pragma solidity ^0.4.18;

contract GeneScience {

    uint32 public constant ATTRIBUTE_NUM = 21;
    uint public _startTime;
    mapping (uint32 => uint32[]) _attribute;
    mapping (uint32 => uint8[]) _attribute_mixrule;
    mapping (uint32 => uint32) _variation_rate;						// 千分之几
    mapping (uint32 => uint32[]) _variation_rate_distribution;		// 百分之几
    
    function GeneScience() public {
        _startTime = now;
        
        _attribute[0] = [47];                               // 是否EXCLUSIVE
        _attribute[1] = [117];                              // 是否FANCY
        _attribute[2] = [107,101,12,8];                     // FANCY属性
        _attribute[3] = [58,10];                            // EXCLUSIVE属性
        _attribute[4] = [124,113,97,95,93,87,76,61,60,36,33,30,28,17]; // BODY
        _attribute[5] = [127,119,84,66,57,27,26,22,4];      // TAIL
        _attribute[6] = [128,125,120,100,99,68,56,46,6];    // PRIMARY COLOR
        _attribute[7] = [118,114,88,80,79,41,40,2,1];       // SECONDARY COLOR
        _attribute[8] = [129,126,86,65,52,49,44,42,34,21];  // PATTERN TYPE
        _attribute[9] = [123,122,111,102,90,64,54,53,38];   // PATTERN COLOR
        _attribute[10] = [89,85,81,72,67,50,32,23,19];      // EYE TYPE
        _attribute[11] = [116,110,103,77,35,29,24,15,9,3];  // EYE COLOR / BACKGROUND COLOR
        _attribute[12] = [98,74,73,71,70,59,48,45,39];      // MOUTH
        _attribute[13] = [109,96,91,75,31,25,20,16,0];      // BEARD
        _attribute[14] = [108,105,82,63,62,55,51,43,13,5];  // ACCESSORIES
        _attribute[15] = [115,112,106,94,69];               // 生育能力
        _attribute[16] = [18,7];                            // 性格
        _attribute[17] = [92,78];                           // 速度
        _attribute[18] = [104,37];                          // 智商
        _attribute[19] = [83,14];                           // 体力
        _attribute[20] = [121,11];                          // 技能
        
        _attribute_mixrule[0] = [3];
        _attribute_mixrule[1] = [6];
        _attribute_mixrule[2] = [1,2];
        _attribute_mixrule[3] = [1,2];
        _attribute_mixrule[4] = [1,2];
        _attribute_mixrule[5] = [5];
        _attribute_mixrule[6] = [1,2];
        _attribute_mixrule[7] = [1,2];
        _attribute_mixrule[8] = [1,2];
        _attribute_mixrule[9] = [1,2];
        _attribute_mixrule[10] = [1,2];
        _attribute_mixrule[11] = [1,2];
        _attribute_mixrule[12] = [1,2];
        _attribute_mixrule[13] = [5];
        _attribute_mixrule[14] = [6];
        _attribute_mixrule[15] = [1,2];
        _attribute_mixrule[16] = [1,2];
        _attribute_mixrule[17] = [1,2];
        _attribute_mixrule[18] = [1,2];
        _attribute_mixrule[19] = [1,2];
        _attribute_mixrule[20] = [1,2];

        _variation_rate[0] = 0;
        _variation_rate[1] = 1;
        _variation_rate[2] = 100;
        _variation_rate[3] = 0;
        _variation_rate[4] = 10;
        _variation_rate[5] = 100;
        _variation_rate[6] = 10;
        _variation_rate[7] = 100;
        _variation_rate[8] = 100;
        _variation_rate[9] = 100;
        _variation_rate[10] = 100;
        _variation_rate[11] = 100;
        _variation_rate[12] = 100;
        _variation_rate[13] = 100;
        _variation_rate[14] = 200;
        _variation_rate[15] = 100;
        _variation_rate[16] = 100;
        _variation_rate[17] = 100;
        _variation_rate[18] = 100;
        _variation_rate[19] = 100;
        _variation_rate[20] = 100;

        _variation_rate_distribution[0] = [100,0];                              // 是否EXCLUSIVE
        _variation_rate_distribution[1] = [100,0];                              // 是否FANCY
        _variation_rate_distribution[2] = [25,25,25,25];                     	// FANCY属性
        _variation_rate_distribution[3] = [30,40,30];                           // EXCLUSIVE属性
        _variation_rate_distribution[4] = [6,6,6,6,6,6,6,6,6,6,6,6,6,6,16]; 	// BODY
        _variation_rate_distribution[5] = [10,10,10,10,10,10,10,10,10,10];      // TAIL
        _variation_rate_distribution[6] = [10,10,10,10,10,10,10,10,10,10];    	// PRIMARY COLOR
        _variation_rate_distribution[7] = [10,10,10,10,10,10,10,10,10,10];      // SECONDARY COLOR
        _variation_rate_distribution[8] = [10,10,10,10,10,10,10,10,10,5,5];  	// PATTERN TYPE
        _variation_rate_distribution[9] = [10,10,10,10,10,10,10,10,10,10];   	// PATTERN COLOR
        _variation_rate_distribution[10] = [10,10,10,10,10,10,10,10,10,10];     // EYE TYPE
        _variation_rate_distribution[11] = [10,10,10,10,10,10,10,10,10,5,5];  	// EYE COLOR / BACKGROUND COLOR
        _variation_rate_distribution[12] = [10,10,10,10,10,10,10,10,10,10];     // MOUTH
        _variation_rate_distribution[13] = [10,10,10,10,10,10,10,10,10,10];     // BEARD
        _variation_rate_distribution[14] = [9,9,9,9,9,9,9,9,9,9,10];  			// ACCESSORIES
        _variation_rate_distribution[15] = [10,10,30,30,10,10];               	// 生育能力
        _variation_rate_distribution[16] = [30,40,30];                          // 性格
        _variation_rate_distribution[17] = [30,40,30];                          // 速度
        _variation_rate_distribution[18] = [30,40,30];                          // 智商
        _variation_rate_distribution[19] = [30,40,30];                          // 体力
        _variation_rate_distribution[20] = [30,40,30];                          // 技能
    }
    
    function random() internal view returns (uint256) {
    	return uint256(keccak256(block.difficulty, now, block.blockhash(block.number - 1), _startTime));
    }

    // index begin with 0
    function getBitMask(uint32[] index) internal pure returns (bytes32) {
    	bytes32 r = 0x0;
    	for(uint32 i=0; i<index.length; i++) {
    	    bytes32 t = bytes32(0x1) << index[i];
    	    r = r | t;
    	}
		return r;
    }

    function mixGenes(uint256 genes1, uint256 genes2) internal view returns (uint256) {
    	bytes32 a = bytes32(genes1);
		bytes32 b = bytes32(genes2);

		bytes32 r = 0x0;
		for(uint32 i=0; i<ATTRIBUTE_NUM; i++) {
			bytes32 mask = getBitMask(_attribute[i]);

			bytes32 ma = mask & a;
			bytes32 mb = mask & b;
			bytes32 mixed;

			if(_attribute_mixrule[i].length == 2) {
			    uint256 rule = random() % 2 + 1;
			    if(rule == 1) {
			        mixed = ma;
			    } else {
			        mixed = mb;
			    }
			} else if(_attribute_mixrule[i][0] == 3) {
			    // all is 0, do nothing
			} else if(_attribute_mixrule[i][0] == 5) {
			    mixed = ma | mb;
			} else if(_attribute_mixrule[i][0] == 6) {
			    mixed = ma & mb;
			}

			mixed = variation(i, mixed);
			r = r | mixed;
		}
		
		return uint256(r);
    }

    function variation(uint32 attID, bytes32 genes) internal view returns (bytes32) {
    	uint32 rate = _variation_rate[attID];
    	if((random() % 1000) >= rate)
    		return genes;

    	uint32[] storage pos = _attribute[attID];
    	uint32 firstPos = 257;

    	for(uint32 i=0; i<pos.length; i++) {
    		if((bytes32(0x1) << pos[i]) & genes > 0) {
    			firstPos = i;
    			break;
    		}
    	}

    	uint32[] storage rate_distribution = _variation_rate_distribution[attID];
    	
    	uint32 rd = uint32(random() % 100);	
    	uint32 total = 100 - rate_distribution[firstPos];
    	uint32 begin = 0;
    	uint32 variation_attr = firstPos;
		for(i=0; i<pos.length; i++) {
			if(i == firstPos)
				continue;

			uint32 end = uint32((rate_distribution[i] / total) * 100) + begin;
			if(rd >= begin && rd < end) {
				variation_attr = i;
				break;
			}

			begin = end;
		}

		return bytes32(0x0) | (bytes32(0x1) << pos[variation_attr]);
    }
    
}

